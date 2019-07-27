import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClipboardService } from 'ngx-clipboard';
import { formatDate } from '@angular/common';
import { Question } from '../interfaces/question';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  date = new Date();

  constructor(
    public dialogRef: MatDialogRef<ReportComponent>,
    private clipboardService: ClipboardService,
    @Inject(LOCALE_ID) private locale: string,
    @Inject(MAT_DIALOG_DATA) public data: {
      answers: string[],
      questions: Question[]
    }
  ) { }

  ngOnInit() {
  }

  copy() {
    this.clipboardService.copyFromContent(
      'コーチング結果\n' +
      formatDate(new Date(), 'yyyy年MM月dd日 HH:mm', this.locale) + '\n\n' +
      this.data.questions
      .map((q, i) => q.title + `\n` + this.data.answers[i])
      .join('\n\n')
    );
  }

}
