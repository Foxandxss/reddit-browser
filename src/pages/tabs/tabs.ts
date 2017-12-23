import { Component } from '@angular/core';

import { ImagesPage } from '../images/images';
import { AlbumsPage } from '../albums/albums';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  imagesTab = ImagesPage;
  albumsTab = AlbumsPage;

  constructor() {

  }
}
