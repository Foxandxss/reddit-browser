import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';

export interface Subreddit {
  id: number;
  name: string;
}

@Injectable()
export class SubredditsProvider {
  subreddits: Subreddit[] = [];
  currentId = 0;

  constructor(private storage: Storage) {
    this.storage.get('currentId').then(index => {
      if (index) {
        this.currentId = index;
      }
    });
  }

  add(name: string) {
    const subreddit = {
      id: this.currentId,
      name: `${name}`
    };
    this.subreddits.push(subreddit);
    this.storage.set(`subreddit${this.currentId++}`, subreddit);
    return this.getAll();
  }

  // temporary solution until I put observables
  getAll() {
    if (!this.subreddits.length) {
      return fromPromise(this.storage.forEach((value: Subreddit, key: string) => {
        this.subreddits.push(value);
      }).then(() => {
        return this.subreddits;
      }));
    }
    return of(this.subreddits);
  }

  remove(subreddit: Subreddit) {
    this.storage.remove(`subreddit${subreddit.id}`);
    return this.getAll();
  }
}
