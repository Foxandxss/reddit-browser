import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImageFetcherProvider } from '../../providers/image-fetcher/image-fetcher';

@IonicPage()
@Component({
  selector: 'page-images',
  templateUrl: 'images.html',
})
export class ImagesPage {
  images: string[] = [];
  images2;

  constructor(public navCtrl: NavController, public navParams: NavParams, private imageFetcher: ImageFetcherProvider) {
  }

  ionViewDidLoad() {
    // this.imageFetcher.fetchImages().subscribe(images => {
    //   console.log(images);
    //   this.images = images
    //   images.subscribe(im => console.log('as', im));
    // });
    this.images2 = this.imageFetcher.fetchImages();
  }

}
