import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubredditsProvider } from '../subreddits/subreddits';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { map, mergeMap } from 'rxjs/operators';

import { UrlProcessorProvider } from '../url-processor/url-processor';
import { Media } from '../../models/media';

@Injectable()
export class MediaFetcherProvider {
  url: string;
  images: string[] = [];

  constructor(
    private http: HttpClient,
    private subredditsProvider: SubredditsProvider,
    private urlProcessor: UrlProcessorProvider
  ) {}

  fetchImages(): Observable<Media[]> {
    this.url = this.createUrl();
    return this.http.get(this.url).pipe(
      map(r => (this.images = this.parseJson(r))),
      mergeMap(urls => {
        urls = urls.map(url => this.urlProcessor.process(url)); // process all urls
        urls = urls.filter(url => url); // but strip the ones that are not supported
        return forkJoin(...urls);
      })
    );
  }

  private createUrl() {
    const subreddits = this.subredditsProvider.subreddits
      .map(sr => sr['name'])
      .join('+');
    return `https://www.reddit.com/r/${subreddits}.json?limit=10`;
  }

  private parseJson(result) {
    const posts = result.data.children;
    return posts.map(post => post.data.url);
  }
}
