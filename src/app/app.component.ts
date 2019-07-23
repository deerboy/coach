import { Component } from '@angular/core';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'coaching';

  constructor(
    private sessionService: SessionService
  ) {}

  start() {
    this.sessionService.start();
  }
}
