import { MovieShowingsComponent } from './movie-showings.component';
import {cold, getTestScheduler} from 'jasmine-marbles';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/merge';

// marble testing
// https://egghead.io/lessons/rxjs-introduction-to-rxjs-marble-testing

describe('MovieShowingsComponent', () => {
  // an example of a simple marble test
  it('marble test', () => {
    const one$ = cold('x-x|');
    const two$ = cold('-y|');

    expect(one$.concat(two$)).toBeObservable(cold('x-x-y|'));
  });

  it('testing race condition', () => {
    const backend = jasmine.createSpyObj('backend', ['getShowings']);
    const cmp = new MovieShowingsComponent(backend);

    backend.getShowings.and.returnValue(cold('--a|', {a: ['10am']}));
    cmp.selectMovie('a');

    backend.getShowings.and.returnValue(cold('-b|', {b: ['11am']}));
    cmp.selectMovie('b');

    getTestScheduler().flush();

    expect(cmp.movieTitle).toEqual('b');
    expect(cmp.showings).toEqual(['11am']);
  });
});
