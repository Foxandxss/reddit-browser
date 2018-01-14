import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SubredditsProvider } from '../../providers/subreddits/subreddits';

/**
 * Generated class for the AddSubredditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-subreddit',
  templateUrl: 'add-subreddit.html',
})
export class AddSubredditPage {
  name: string;

  constructor(public navCtrl: NavController, private subredditsProvider: SubredditsProvider) {
  }

  create() {
    if (this.name) {
      this.subredditsProvider.add(this.name);
      this.navCtrl.pop();
    }
  }

}
