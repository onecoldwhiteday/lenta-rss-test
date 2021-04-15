import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { INewsDetail } from '../types/news.type';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent {

  public published: string;
  public article: INewsDetail;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { date: string, article: INewsDetail },
    public dialogRef: MatDialogRef<NewsDetailComponent>,
  ) {
    this.published = data.date;
    this.article = data.article;
  }

  public parseDate(date: string): string {
    return new Date(date).toLocaleString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' })
  }

  close(): void {
    this.dialogRef.close();
  }

}
