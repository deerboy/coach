import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Question } from '../interfaces/question';

export const DEFAULT_QUESTIONS: Question[] = [
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

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  questionIndex: number;
  sessionSource = new Subject<boolean>();
  session$ = this.sessionSource.asObservable();

  questionSource = new BehaviorSubject<number>(0);
  question$ = this.questionSource.asObservable();

  constructor() { }

  start() {
    this.sessionSource.next(true);
  }

  stop() {
    this.sessionSource.next(false);
  }

  changeQuestion(index: number)   {
    this.questionSource.next(index);
  }
}
