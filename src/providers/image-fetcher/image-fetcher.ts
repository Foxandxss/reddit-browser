import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubredditsProvider } from '../subreddits/subreddits';

import { of } from 'rxjs/Observable/of';
import { forkJoin } from 'rxjs/Observable/forkJoin';
import { map, mergeMap } from 'rxjs/operators';
import { UrlProcessorProvider } from '../url-processor/url-processor';

@Injectable()
export class ImageFetcherProvider {
  url: string;
  images: string[] = [];

  constructor(private http: HttpClient, private subredditsProvider: SubredditsProvider, private urlProcessor: UrlProcessorProvider) {
  }

  fetchImages() {
    // this.url = this.createUrl();
    // return this.http.get(this.url).pipe(map(r => this.images = this.parseJson(r)));
    return of(['https://gfycat.com/gifs/detail/threadbareenchantedasianwaterbuffalo', 'https://gfycat.com/gifs/detail/darlingbountifulbetafish']).pipe(mergeMap(urls => {
      return forkJoin(...urls.map(url => this.urlProcessor.process(url)));
    }));
  }

  private createUrl() {
    const subreddits = this.subredditsProvider.subreddits.map(sr => sr['name']).join('+');
    return `https://www.reddit.com/r/${subreddits}.json?limit=10`;
  }

  private parseJson(result) {
    const posts = result.data.children;
    return posts.map(post => post.data.url);
  }

}
