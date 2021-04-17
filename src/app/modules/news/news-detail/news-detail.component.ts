import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { parseDateHelper } from '../../../helpers/parse-date-helper';
import { INewsDetail } from '../types/news.type';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent {

  public published: string;
  public article: INewsDetail;
  public parseDate: (date: string) => string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { date: string, article: INewsDetail },
    public dialogRef: MatDialogRef<NewsDetailComponent>,
  ) {
    this.published = data.date;
    this.article = data.article;
    this.parseDate = parseDateHelper.parseDateTimeFirst;
  }

  close(): void {
    this.dialogRef.close();
  }

}
