import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SubredditsProvider, Subreddit } from '../../providers/subreddits/subreddits';

/**
 * Generated class for the AlbumsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-albums',
  templateUrl: 'albums.html',
})
export class AlbumsPage {
  subreddits: Subreddit[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private subredditsProvider: SubredditsProvider
  ) {
  }

  ionViewDidLoad() {
    this.subreddits = this.subredditsProvider.subreddits;
  }

}
