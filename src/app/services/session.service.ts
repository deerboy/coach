import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Question } from '../interfaces/question';
import { moveItemInArray } from '@angular/cdk/drag-drop';

const DEFAULT_QUESTIONS: Question[] = [
  {
    id: 'what',
    title: '今感じてる課題は？',
    description: '質問を繰り返して課題の解像度をあげてください。'
  },
  {
    id: 'goal',
    title: '何をもって解決となりますか？',
    description: '質問を繰り返して具体的な達成条件を導き出してください。'
  },
  {
    id: 'how',
    title: 'どうすれば解決しますか？',
    description: '質問を繰り返して具体的なアクションを導き出してください。'
  },
  {
    id: 'when',
    title: 'いつからはじめますか？',
    description: '質問を繰り返して明確な開始時期を定義してください。'
  },
  {
    id: 'check',
    title: 'どのように進捗が把握できますか？',
    description: '目標達成までの間、進捗を把握するための報告手段を提案してもらいましょう。'
  },
];

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  sessionTime = this.load('sessionTime') || 1800;
  questions: Question[] = this.load('questions') || DEFAULT_QUESTIONS;
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
