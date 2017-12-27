import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ImagesPage } from '../pages/images/images';
import { AlbumsPage } from '../pages/albums/albums';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SubredditsProvider } from '../providers/subreddits/subreddits';
import { ImageFetcherProvider } from '../providers/image-fetcher/image-fetcher';
import { UrlProcessorProvider } from '../providers/url-processor/url-processor';


@NgModule({
  declarations: [
    MyApp,
    ImagesPage,
    AlbumsPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ImagesPage,
    AlbumsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SubredditsProvider,
    ImageFetcherProvider,
    UrlProcessorProvider
  ]
})
export class AppModule {}
