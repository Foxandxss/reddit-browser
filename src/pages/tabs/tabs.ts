import { Component } from '@angular/core';

import { MediaPage } from '../media/media';
import { AlbumsPage } from '../albums/albums';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  mediaTab = MediaPage;
  albumsTab = AlbumsPage;

  constructor() {}
}
