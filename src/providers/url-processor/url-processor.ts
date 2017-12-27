// This service is heavily based on redditp's embedit. Kudos to them
// https://github.com/ubershmekel/redditp

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { map } from 'rxjs/operators';

@Injectable()
export class UrlProcessorProvider {
  private convertors = [
    {
      name: "gfycat",
      detect: /gfycat\.com.*/,
      convert: (url) => {
        var name = this.gfyUrlToId(url);
        if (!name) return false;

        return this.http.get(`https://gfycat.com/cajax/get/${name}`).pipe(map((r: any) => {
          // console.log(r);
          return {
            webmUrl: r.gfyItem.webmUrl,
            mp4Url: r.gfyItem.mp4Url
          }
        }));
      }
    }
  ];

  process(url) {
    const keys = Object.keys(this.convertors);
    for (var i = 0; i < keys.length; i++) {
        const key = keys[i];
        const convertor = this.convertors[key];
        if (url.match(convertor.detect)) {
            return convertor.convert(url);
        }
    }
    // embedit.unsupported(url);
    // embedFunc(null);
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
