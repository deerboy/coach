import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { SessionService } from '../services/session.service';
import { interval, Subscription, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Question } from '../interfaces/question';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ReportComponent } from '../report/report.component';

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
  sessionTime = this.sessionService.sessionTime;
  currentIndex = 0;
  questionIndex$: Observable<number> = this.sessionService.question$;
  now = this.getMinSec(0);
  started$: Observable<boolean> = this.sessionService.session$.pipe(
    tap(status => this.status = status)
  );
  answer = new FormControl();
  questions: Question[] = this.sessionService.questions;
  answers: string[] = [];

  @ViewChild('answerInput', {
    static: true
  }) answerInput: ElementRef;

  constructor(
    private sessionService: SessionService,
    private hotkeysService: HotkeysService,
    public dialog: MatDialog
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
      this.toNext();
      return false;
    }));

    this.hotkeysService.add(new Hotkey('left', (event: KeyboardEvent): boolean => {
      this.toPrev();
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

  toNext() {
    this.changeQuestion(Math.min(this.currentIndex + 1, this.questions.length - 1));
  }

  toPrev() {
    this.changeQuestion(Math.max(this.currentIndex - 1, 0));
  }

  get per(): number {
    return this.timer / this.sessionTime * 100;
  }

  private changeQuestion(target: number) {
    this.sessionService.changeQuestion(target);
    this.currentIndex = target;
    this.answer.patchValue(this.answers[this.currentIndex]);
  }

  private getMinSec(num: number) {
    return {
      min: Math.floor(num / 60),
      sec: num % 60,
    };
  }

  ngOnInit() {
    this.answer.valueChanges.subscribe(value => {
      this.answers[this.currentIndex] = value;
    });
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

  get isComplete() {
    return this.questions.length === this.answers.filter(v => v).length;
  }

  getReport() {
    this.dialog.open(ReportComponent, {
      width: '560px',
      data: {
        answers: this.answers,
        questions: this.questions
      }
    });
  }

}
