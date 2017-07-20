import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {Backend, MovieShowingsComponent} from './movie-showings.component';

@NgModule({
  declarations: [
    MovieShowingsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [Backend],
  bootstrap: [MovieShowingsComponent]
})
export class AppModule { }
