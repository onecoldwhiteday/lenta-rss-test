import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber, Subscription } from 'rxjs';
import { INewsDetail, INewsShort } from '../types/news.type';
import { MatDialog, MatDialogState } from '@angular/material/dialog';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { MatSort, Sort } from '@angular/material/sort';
import { NewsTableDataSource } from './news-table-data-source';
import { NewsService } from '../../../services/news.service';
import { parseDateHelper } from '../../../helpers/parse-date-helper';
import { PaginatedResponse } from '../../../types/paginated-response';
import { NewsDetailComponent } from '../news-detail/news-detail.component';
import { LoaderService } from '../../../services/loader.service';
import { HttpErrorHandler } from '../../error-handler/error-handler';
import * as _ from 'lodash';

@Component({
  selector: 'app-news-table',
  templateUrl: './news-table.component.html',
  styleUrls: ['./news-table.component.scss'],
})

export class NewsTableComponent implements OnInit, OnDestroy {

  public news: INewsShort[] = [];
  public displayedColumns: string[] = ['thumbnail', 'title', 'summary', 'date', 'link'];

  public dataSubject = new BehaviorSubject<INewsShort[]>([]);
  public dataSource!: NewsTableDataSource;
  public subscription: Subscription = new Subscription();
  public parseDate: (date: string) => string;
  public lastSort?: Sort;
  public isLoading: any;
  public serverError: any;
  public isLocal: boolean = false;

  public refreshSubject = new BehaviorSubject(0);

  private selectedRow = '';
  private errorHandler = new HttpErrorHandler();

  constructor(
    public dialog: MatDialog,
    public loaderService: LoaderService,
    public newsService: NewsService) {
    this.parseDate = parseDateHelper.parseDate;
    loaderService.isLoading.subscribe((isLoading) => this.isLoading = isLoading);
  }


  ngOnInit(): void {
    this.initSubscription();
  }

  public initSubscription() {
    this.dataSource = new NewsTableDataSource(this.dataSubject);

    this.subscription = this.refreshSubject.asObservable()
      .pipe(
        switchMap(() => this.getAllNews()
          .pipe(
            map((news: INewsShort[]) => {
              news.forEach(n => { this.news = [...this.news, n] })
              this.dataSubject.next(this.news);
            }),
            tap(() => {
              if (this.lastSort) {
                this.onSortChange(this.lastSort)
              }
            }),
          )
        )
      ).subscribe(
        res => res,
        err => {
          this.serverError = this.errorHandler.handleError(err);
        },
    );
  }

  public getAllNews(
    offset?: number,
    limit?: number
  ): Observable<INewsShort[]> {
    return this.newsService.getNews(limit, offset).pipe(
      map((res: PaginatedResponse<INewsShort>): INewsShort[] => {
        this.isLocal = true;
        this.news = [];
        return _.uniqBy(res.results, 'title');
      }),
    )
  }

  onSortChange(sort: Sort) {
    let data = this.news.slice();
    this.lastSort = sort;
    if (sort.active && sort.direction !== '') {
      data = data.sort((a: INewsShort, b: INewsShort) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'title': return this.compare(a.title, b.title, isAsc);
          case 'date': return this.compare(new Date(a.published), new Date(b.published), isAsc);
          default: return 0;
        }
      });
    }
    this.dataSubject.next(data);
  }

  private compare(a: any, b: any, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public openNewsDetail(n: INewsShort): void {
    this.newsService.getNewsDetails(n.link).subscribe(
      (article: INewsDetail) => {
        this.dialog.open(NewsDetailComponent, {
          width: '800px',
          data: { date: n.published, article }
        })
      },
      err => {
        this.serverError = this.errorHandler.handleError(err)
      }
    );
  }

  public refreshData(): void {
    window.scrollTo(0,0);
    this.refreshSubject.next(0);
  }

  public isSelected(index: string): boolean {
    return this.selectedRow === index;
  }

  public selectRow(index: string): void {
    if (this.selectedRow === index) {
      this.selectedRow = '';
    } else {
      this.selectedRow = index;
    }
  }
}
