import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/switchMap';

export class Backend {
  getShowings(title: string): Observable<string[]> {
    if (title === "After the Storm") {
      return of(["10 a.m.", "1:30 p.m."]);
    } else if (title === "Paterson") {
      return of(["11 a.m.", "3:00 p.m."]);
    } else {
      return of([]);
    }
  }
}

@Component({
  selector: 'movie-showings-cmp',
  templateUrl: './movie-showings.component.html'
})
export class MovieShowingsComponent {
  public movieTitle: string;
  public showings: string[];

  private getShowings = new Subject<string>();

  constructor(private backend: Backend) {
    this.getShowings.switchMap(movieTitle => this.backend.getShowings(movieTitle)).subscribe(showings => {
      this.showings = showings;
    });
  }

  selectMovie(movieTitle: string) {
    this.movieTitle = movieTitle;
    this.getShowings.next(movieTitle);
  }
}

/*
Version with the bug

@Component({
  selector: 'movie-showings-cmp',
  templateUrl: './movie-showings.component.html'
})
export class MovieShowingsComponent {
  public movieTitle: string;
  public showings: string[];

  constructor(private backend: Backend) {}

  showShowings(movieTitle: string) {
    this.movieTitle = movieTitle;

    this.backend.getShowings(movieTitle).subscribe(showings => {
      this.showings = showings;
    });
  }
}
 */
