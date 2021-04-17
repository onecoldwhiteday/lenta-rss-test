import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { MatCardModule } from '@angular/material/card';
import { HttpErrorHandlerModule } from '../error-handler/error-handler.module';

@NgModule({
  declarations: [
    LoaderComponent,
    ErrorMessageComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  exports: [LoaderComponent, ErrorMessageComponent]
})
export class SharedModule { }
