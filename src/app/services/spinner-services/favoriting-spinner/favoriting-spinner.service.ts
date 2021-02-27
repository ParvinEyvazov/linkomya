import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritingSpinnerService {
  private count = 0;

  private spinner$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  getSpinner(): Observable<boolean> {
    return this.spinner$.asObservable();
  }

  start() {
    if (++this.count === 1) {
      this.spinner$.next(true);
    }
  }

  stop() {
    if (this.count == 0 || --this.count === 0) {
      this.spinner$.next(false);
    }
  }

  reset() {
    this.count = 0;
    this.spinner$.next(false);
  }
}
