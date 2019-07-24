import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionService, DEFAULT_QUESTIONS } from '../services/session.service';
import { interval, Subscription, Observable } from 'rxjs';
import { Question } from '../interfaces/question';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit, OnDestroy {

  timer = 0;
  started: boolean;
  subscription: Subscription;
  sessionTime = 1800;
  time: Date;
  currentIndex = 0;
  questionIndex$: Observable<number> = this.sessionService.question$;
  sessionMin = this.sessionTime / 60;
  now = {
    min: 0,
    sec: 0
  };

  questions: Question[] = DEFAULT_QUESTIONS;

  qTime = this.sessionTime / this.questions.length;

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
        this.currentIndex = Math.floor((this.timer - 1) / this.qTime);
      } else {
        this.sessionService.stop();
      }
    });
  }

  get per(): number {
    return this.timer / this.sessionTime;
  }

  private getMinSec(num: number) {
    console.log(num);
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

}
