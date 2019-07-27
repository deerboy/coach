import { Component, OnInit, Inject, LOCALE_ID, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ClipboardService } from 'ngx-clipboard';
import { formatDate } from '@angular/common';
import { Question } from '../interfaces/question';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit, AfterViewInit {

  date = new Date();
  image;

  constructor(
    public dialogRef: MatDialogRef<ReportComponent>,
    private clipboardService: ClipboardService,
    private snackBar: MatSnackBar,
    @Inject(LOCALE_ID) private locale: string,
    @Inject(MAT_DIALOG_DATA) public data: {
      answers: string[],
      questions: Question[]
    }
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.getImage();
  }

  copy() {
    this.clipboardService.copyFromContent(
      'コーチング結果\n' +
      formatDate(new Date(), 'yyyy年MM月dd日 HH:mm', this.locale) + '\n\n' +
      this.data.questions
      .map((q, i) => q.title + `\n` + this.data.answers[i])
      .join('\n\n')
    );
    this.snackBar.open('コピーしました', null, {
      duration: 2000
    });
  }

  getImage() {
    const data = document.getElementById('result');
    html2canvas(data).then(canvas => this.image = canvas.toDataURL());
  }
}
