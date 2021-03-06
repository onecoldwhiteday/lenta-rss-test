import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { INewsDetail, INewsShort } from "../modules/news/types/news.type";
import { PaginatedResponse } from "../types/paginated-response";
import { ApiService } from "./api.service";

@Injectable()
export class NewsService {
  private newsDetailCache = new Map();

  constructor(private _api: ApiService) {}

  public getNews(limit: number = 10, offset: number = 0): Observable<PaginatedResponse<INewsShort>> {
    return this._api.get('news', { params: { limit, offset } })
  }

  public getNewsDetails(url: string): Observable<INewsDetail> {
    const newsFromCache = this.newsDetailCache.get(url);
    if (newsFromCache) {
      return of(newsFromCache);
    }
    return this._api.get('news-details', { params: { url } }).pipe(map((news: INewsDetail) => {
      this.newsDetailCache.set(url, news);
      return news;
    }))
  }
}
