import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { MediaPageModule } from '../pages/media/media.module';
import { AlbumsPageModule } from '../pages/albums/albums.module';
import { AddSubredditPageModule } from '../pages/add-subreddit/add-subreddit.module';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SubredditsProvider } from '../providers/subreddits/subreddits';
import { MediaFetcherProvider } from '../providers/media-fetcher/media-fetcher';
import { UrlProcessorProvider } from '../providers/url-processor/url-processor';

@NgModule({
  declarations: [MyApp, TabsPage],
  imports: [
    BrowserModule,
    HttpClientModule,
    MediaPageModule,
    AlbumsPageModule,
    AddSubredditPageModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, TabsPage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    SubredditsProvider,
    MediaFetcherProvider,
    UrlProcessorProvider
  ]
})
export class AppModule {}
