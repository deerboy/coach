import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  sessionSource = new Subject<boolean>();
  session$ = this.sessionSource.asObservable();

  constructor() { }

  start() {
    this.sessionSource.next(true);
  }

  stop() {
    this.sessionSource.next(false);
  }
}
