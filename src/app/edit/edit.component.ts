import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Question } from '../interfaces/question';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatBottomSheet } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  questions: Question[] = this.sessionService.questions;
  editTarget: number;
  sessionTime = this.sessionService.sessionTime;
  sessionTimeForm = new FormControl(this.sessionTime, Validators.required);

  constructor(
    private sessionService: SessionService,
  ) { }

  ngOnInit() {
    this.sessionTimeForm.valueChanges.subscribe(time => {
      this.sessionService.sessionTime = time;
      this.sessionService.save();
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    this.sessionService.changeQuestionOrder(
      event.previousIndex,
      event.currentIndex
    );
  }

  addQuestion(body: {
    title: string;
    description: string;
  }) {
    this.sessionService.addQuestion(body);
  }

  deleteQuestion(index: number) {
    this.sessionService.deleteQuestion(index);
  }

  updateQuestion(index: number, body: {
    title: string;
    description: string;
  }) {
    this.sessionService.updateQuestion(
      index,
      body
    );
    this.editTarget = null;
  }

}
