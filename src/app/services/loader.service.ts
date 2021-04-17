import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class LoaderService {
  public isLoading = new Subject<boolean>();
  public show(): void {
    this.isLoading.next(true);
  }
  public hide(): void {
    this.isLoading.next(false);
  }
}
