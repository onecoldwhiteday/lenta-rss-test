import { ErrorHandler, NgModule } from "@angular/core";
import { HttpErrorHandler } from "./error-handler";

@NgModule({
  providers: [{ provide: ErrorHandler, useClass: HttpErrorHandler }]
})
export class HttpErrorHandlerModule { }
