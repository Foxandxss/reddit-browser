import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddSubredditPage } from './add-subreddit';

@NgModule({
  declarations: [
    AddSubredditPage,
  ],
  imports: [
    IonicPageModule.forChild(AddSubredditPage),
  ],
})
export class AddSubredditPageModule {}
