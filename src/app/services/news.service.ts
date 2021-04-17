import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { INewsDetail, INewsShort } from "../modules/news/types/news.type";
import { PaginatedResponse } from "../types/paginated-response";
import { ApiService } from "./api.service";

@Injectable()
export class NewsService {
  constructor(private _api: ApiService) {}

  public getNews(limit: number = 10, offset: number = 0): Observable<PaginatedResponse<INewsShort>> {
    return this._api.get('news', { params: { limit, offset } })
  }

  public getNewsDetails(url: string): Observable<INewsDetail> {
    return this._api.get('news-details', { params: { url }})
  }
}
