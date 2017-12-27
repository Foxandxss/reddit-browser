import { Injectable } from '@angular/core';

export interface Subreddit {
  name: string;
}

@Injectable()
export class SubredditsProvider {
  subreddits: Subreddit[] = [];

  constructor() {
    // add some fake data
    this.subreddits.push({
      name: 'earthporn'
    });
    this.subreddits.push({
      name: 'pizza'
    });
  }
}
