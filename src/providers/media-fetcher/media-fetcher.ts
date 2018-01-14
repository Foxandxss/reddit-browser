import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubredditsProvider } from '../subreddits/subreddits';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { map, mergeMap } from 'rxjs/operators';

import { UrlProcessorProvider } from '../url-processor/url-processor';

@Injectable()
export class MediaFetcherProvider {
  url: string;
  images: string[] = [];

  constructor(
    private http: HttpClient,
    private subredditsProvider: SubredditsProvider,
    private urlProcessor: UrlProcessorProvider
  ) {}

  fetchImages() {
    return this.createUrl().pipe(
      map((url) => {
        return this.http.get(url).pipe(
          map(r => this.images = this.parseJson(r)),
          mergeMap(urls => {
            urls = urls.map(url => this.urlProcessor.process(url))
            urls = urls.filter(url => url);
            return forkJoin(...urls);
          })
        )
      }));
  }

  private createUrl() {
    return this.subredditsProvider.getAll().pipe(map(subreddits => {
      const subredditsString = subreddits.map(sr => sr['name']).join('+')
      return `https://www.reddit.com/r/${subredditsString}.json?limit=10`;
    }));
  }

  private parseJson(result) {
    const posts = result.data.children;
    return posts.map(post => post.data.url);
  }
}
