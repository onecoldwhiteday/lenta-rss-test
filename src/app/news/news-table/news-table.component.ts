import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { INewsDetail, INewsShort } from '../types/news.type';
import { MatDialog } from '@angular/material/dialog';
import { PaginatedResponse } from '../../types/paginated-response';
import { map } from 'rxjs/operators';
import { NewsDetailComponent } from '../news-detail/news-detail.component';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news-table',
  templateUrl: './news-table.component.html',
  styleUrls: ['./news-table.component.scss'],
})

export class NewsTableComponent implements OnInit {

  public news!: Observable<INewsShort[]>;
  public pageSize = 10;
  public pageOffset = 0;
  public totalCount = 0;
  public returnCount = 0;
  public displayedColumns: string[] = ['thumbnail', 'title', 'summary', 'date', 'link'];

  constructor(
    public dialog: MatDialog,
    public newsService: NewsService) {
  }

  ngOnInit(): void {
    this.news = this.getAllNews();
  }

  public getAllNews(
    offset: number = this.pageOffset,
    limit: number = this.pageSize
  ): Observable<INewsShort[]> {
    return this.newsService.getNews(limit, offset).pipe(
      map((res: PaginatedResponse<INewsShort>): INewsShort[] => {
        this.totalCount = res.totalCount;
        this.returnCount = res.returnedCount;
        return res.results;
      })
    )
  }

  /*public onSortChange(event: Sort): void {
    if (event.direction !== '') {
      const ordering = new Ordering();
      ordering.append(event.direction, event.active);
      this.ordering = ordering;
    } else {
      this.ordering = new Ordering();
    }
    this.users = this.getAllUsers();
  }*/

  public parseDate(date: string) {
    return new Date(date).toLocaleString('ru-RU', {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' })
  }

  public openNewsDetail(n: INewsShort): void {
    this.newsService.getNewsDetails(n.link).subscribe(
      (article: INewsDetail) => {
        this.dialog.open(NewsDetailComponent, {
          width: '800px',
          data: { date: n.published, article }
        });
      }
    );
  }

  public refreshData(): void {
    this.news = this.getAllNews();
  }

/*  public onPage(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageOffset = event.pageIndex !== 0 ? event.pageSize * event.pageIndex : event.pageIndex;
    this.news = this.getAllNews();
  }*/
}
