import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Question } from '../interfaces/question';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatBottomSheet } from '@angular/material';
import { QuestionEditorComponent } from '../question-editor/question-editor.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  questions: Question[] = this.sessionService.questions;

  constructor(
    private sessionService: SessionService,
    private bottomSheet: MatBottomSheet
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

  editQuestion(index: number, question: Question) {
    this.bottomSheet.open(QuestionEditorComponent, {
      data: {
        index,
        question
      }
    });
  }

}
