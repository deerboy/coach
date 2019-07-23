import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionService } from '../services/session.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit, OnDestroy {

  timer = 0;
  started: boolean;
  subscription: Subscription;
  sessionTime = 18;
  time: Date;
  now = 0;

  questions = [
    {
      id: 'what',
      text: '今一番の悩みは何ですか？'
    },
    {
      id: 'goal',
      text: '何をもって解決となりますか？'
    },
    {
      id: 'how',
      text: 'どうすれば解決しますか？'
    },
    {
      id: 'when',
      text: 'いつからはじめますか？'
    }
  ];

  qTime = this.sessionTime / this.questions.length;

  constructor(
    private sessionService: SessionService
  ) {
    this.sessionService.session$.subscribe(status => {
      this.started = status;
    });

    this.subscription = interval(1000).subscribe(() => {
      if (this.started && this.timer < this.sessionTime) {
        this.timer++;
        this.now = Math.floor((this.timer - 1) / this.qTime);
      }
    });
  }

  get per(): number {
    return this.timer / this.sessionTime;
  }

  get label(): number {
    return Math.max(this.timer - 1, 0);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
