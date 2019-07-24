import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Question } from '../interfaces/question';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  questions: Question[] = this.sessionService.questions;

  constructor(
    private sessionService: SessionService
  ) { }

  ngOnInit() {
  }

}
