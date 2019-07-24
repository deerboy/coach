import { Component } from '@angular/core';
import { SessionService } from './services/session.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  status: boolean;
  started$: Observable<boolean> = this.sessionService.session$.pipe(
    tap(status => this.status = status)
  );

  constructor(
    private sessionService: SessionService
  ) {}

  start() {
    this.sessionService.start();
  }

  stop() {
    this.sessionService.stop();
  }

  toggleStatus() {
    if (this.status) {
      this.stop();
    } else {
      this.start();
    }
  }
}
