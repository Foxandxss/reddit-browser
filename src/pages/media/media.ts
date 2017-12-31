import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { MediaFetcherProvider } from "../../providers/media-fetcher/media-fetcher";

@IonicPage()
@Component({
  selector: "page-media",
  templateUrl: "media.html"
})
export class MediaPage {
  media;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private mediaFetcher: MediaFetcherProvider
  ) {}

  ionViewDidLoad() {
    this.media = this.mediaFetcher.fetchImages();
  }
}
