import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Question } from '../interfaces/question';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatBottomSheet } from '@angular/material';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  questions: Question[] = this.sessionService.questions;
  editTarget: number;

  constructor(
    private sessionService: SessionService,
  ) { }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    this.sessionService.changeQuestionOrder(
      event.previousIndex,
      event.currentIndex
    );
  }

  addQuestion(text: string) {
    this.sessionService.addQuestion(text);
  }

  deleteQuestion(index: number) {
    this.sessionService.deleteQuestion(index);
  }

  updateQuestion(index: number, text: string) {
    this.sessionService.updateQuestion(
      index,
      text
    );
    this.editTarget = null;
  }

}
