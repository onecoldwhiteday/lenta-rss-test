import { MatTableDataSource } from "@angular/material/table";
import { BehaviorSubject } from "rxjs";
import { INewsShort } from "../types/news.type";

export class NewsTableDataSource extends MatTableDataSource<INewsShort> {

  constructor(private subject: BehaviorSubject<INewsShort[]>) {
    super();
  }

  connect(): BehaviorSubject<any[]> {
    return this.subject;
  }

  disconnect(): void {

  }
}
