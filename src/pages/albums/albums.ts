import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import {
  SubredditsProvider,
  Subreddit
} from '../../providers/subreddits/subreddits';
import { AddSubredditPage } from '../add-subreddit/add-subreddit';


/**
 * Generated class for the AlbumsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-albums',
  templateUrl: 'albums.html'
})
export class AlbumsPage {
  subreddits: Subreddit[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private subredditsProvider: SubredditsProvider,
    private modalCtrl: ModalController
  ) {}

  add() {
    const modal = this.modalCtrl.create(AddSubredditPage);
    modal.present();
  }

  delete(album: Subreddit) {
    this.subredditsProvider.remove(album);
    this.subreddits = this.subreddits.filter(sr => {
      return sr.id !== album.id;
    });
  }

  ionViewDidLoad() {
    this.subredditsProvider.getAll().subscribe(sr => this.subreddits = sr);
  }
}
