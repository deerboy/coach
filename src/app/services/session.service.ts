import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Question } from '../interfaces/question';
import { moveItemInArray } from '@angular/cdk/drag-drop';

const DEFAULT_QUESTIONS: Question[] = [
  {
    id: 'what',
    title: '最終的な目標は？',
    description: '質問を繰り返して目標の解像度をあげてください。'
  },
  {
    id: 'how',
    title: 'なにからはじめますか？',
    description: '具体的なアクションをヒアリングしてください。'
  },
  {
    id: 'when',
    title: 'いつからはじめますか？',
    description: '明確な開始日を定義してください。'
  },
  {
    id: 'check',
    title: '進捗を知る方法は？',
    description: '共有手段を具体的に提案してもらいましょう。'
  },
];

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  sessionTime = 1800;
  questions: Question[] = DEFAULT_QUESTIONS;
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

  deleteQuestion(index: number) {
    this.questions.splice(index, 1);
    this.save();
  }

  updateQuestion(i: number, body: {
    title: string;
    description: string;
  }) {
    this.questions[i].title = body.title;
    this.questions[i].description = body.description;
    this.save();
  }

  addQuestion(body: {
    title: string;
    description: string;
  }) {
    this.questions.push({
      id: Date.now().toString(),
      ...body
    });
    this.save();
  }

  changeQuestionOrder(before: number, after: number) {
    moveItemInArray(this.questions, before, after);
    this.save();
  }

  save() {
    localStorage.setItem('data', JSON.stringify({
      sessionTime: this.sessionTime,
      questions: this.questions
    }));
  }

  private load(key: string) {
    const item = localStorage.getItem('data');
    if (item) {
      return JSON.parse(item)[key];
    } else {
      return null;
    }
  }
}
