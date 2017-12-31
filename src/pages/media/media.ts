import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { MediaFetcherProvider } from '../../providers/media-fetcher/media-fetcher';
import { Media, MediaKind } from '../../models/media';

@IonicPage()
@Component({
  selector: 'page-media',
  templateUrl: 'media.html'
})
export class MediaPage {
  media: Observable<Media[]>;
  kind = MediaKind;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private mediaFetcher: MediaFetcherProvider
  ) {}

  ionViewDidLoad() {
    this.media = this.mediaFetcher.fetchImages();
    this.media.subscribe(r => console.log(r));
  }
}
