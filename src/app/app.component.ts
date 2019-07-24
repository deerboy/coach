import { Component } from '@angular/core';
import { SessionService } from './services/session.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

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
    private sessionService: SessionService,
    private hotkeysService: HotkeysService
  ) {
    this.hotkeysService.add(new Hotkey(['s', 'space'], (event: KeyboardEvent): boolean => {
      this.toggleStatus();
      return false;
    }));
  }

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
