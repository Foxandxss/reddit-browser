// This service is heavily based on redditp's embedit. Kudos to them
// https://github.com/ubershmekel/redditp

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';

import { MediaKind, Media } from '../../models/media';

@Injectable()
export class UrlProcessorProvider {
  private convertors = [
    {
      name: 'imgurAlbums',
      detect: /imgur\.com\/a\/.*/,
      convert: function(url, embedFunc) {
        return null;
      }
    },
    {
      name: 'imgurGifv',
      detect: /imgur\.com.*(gif|gifv|mp4|webm)/,
      convert: function(url) {
        var no_extension = url.replace(/\.\w+$/, '');
        var webmUrl = no_extension + '.webm';
        var mp4Url = no_extension + '.mp4';
        of({
          webmUrl: webmUrl,
          mp4Url: mp4Url,
          kind: MediaKind.video
        });
      }
    },
    {
      name: 'imgurNoExtension',
      detect: /imgur\.com[^.]+/,
      convert: function(url) {
        var newUrl = url + '.jpg';
        return of({ url: newUrl, kind: MediaKind.image });
      }
    },
    {
      name: 'gfycat',
      detect: /gfycat\.com.*/,
      convert: url => {
        var name = this.gfyUrlToId(url);
        if (!name) return false;

        return this.http.get(`https://gfycat.com/cajax/get/${name}`).pipe(
          map((r: any) => {
            // console.log(r);
            return {
              webmUrl: r.gfyItem.webmUrl,
              mp4Url: r.gfyItem.mp4Url,
              kind: MediaKind.video
            };
          })
        );
      }
    },
    {
      name: 'imageExtension',
      detect: /\.(png|jpg|jpeg|gif|bmp)$/,
      convert: function(url) {
        return of({ url: url, kind: MediaKind.image });
      }
    }
  ];

  process(url): Media | null {
    const keys = Object.keys(this.convertors);
    for (var i = 0; i < keys.length; i++) {
      const key = keys[i];
      const convertor = this.convertors[key];
      if (url.match(convertor.detect)) {
        return convertor.convert(url);
      }
    }
    return null;
  }

  private gfyUrlToId(url) {
    //https://gfycat.com/cajax/get/ScaryGrizzledComet
    var match = url.match(/gfycat.com\/(gifs\/detail\/)?(\w+)/i);
    if (match && match.length > 2) {
      return match[2];
    } else {
      return false;
    }
  }

  constructor(private http: HttpClient) {}
}
