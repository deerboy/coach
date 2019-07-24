import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionService } from '../services/session.service';
import { interval, Subscription, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Question } from '../interfaces/question';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit, OnDestroy {
  status: boolean;
  timer = 0;
  started: boolean;
  subscription: Subscription;
  sessionTime = 1800;
  currentIndex = 0;
  questionIndex$: Observable<number> = this.sessionService.question$;
  now = this.getMinSec(0);
  started$: Observable<boolean> = this.sessionService.session$.pipe(
    tap(status => this.status = status)
  );

  questions: Question[] = this.sessionService.questions;

  constructor(
    private sessionService: SessionService,
    private hotkeysService: HotkeysService
  ) {
    this.sessionService.session$.subscribe(status => {
      this.started = status;
      if (status && this.timer === this.sessionTime) {
        this.timer = 0;
      }
    });

    this.hotkeysService.add(new Hotkey(['s', 'space'], (event: KeyboardEvent): boolean => {
      this.toggleStatus();
      return false;
    }));

    this.hotkeysService.add(new Hotkey('right', (event: KeyboardEvent): boolean => {
      const target = Math.min(this.currentIndex + 1, this.questions.length - 1);
      this.sessionService.changeQuestion(target);
      this.currentIndex = target;
      return false;
    }));

    this.hotkeysService.add(new Hotkey('left', (event: KeyboardEvent): boolean => {
      const target = Math.max(this.currentIndex - 1, 0);
      this.sessionService.changeQuestion(target);
      this.currentIndex = target;
      return false;
    }));

    this.subscription = interval(1000).subscribe(() => {
      if (this.started && this.timer < this.sessionTime) {
        this.timer++;
        this.now = this.getMinSec(this.timer);
      } else {
        this.sessionService.stop();
      }
    });
  }

  get per(): number {
    return this.timer / this.sessionTime;
  }

  private getMinSec(num: number) {
    return {
      min: Math.floor(num / 60),
      sec: num % 60,
    };
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
