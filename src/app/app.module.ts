import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from './services/api.service';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { LoaderService } from './services/loader.service';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { NewsModule } from './modules/news/news.module';
import { SharedModule } from './modules/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { HttpErrorHandlerModule } from './modules/error-handler/error-handler.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/news/news.module').then(m => m.NewsModule),
  }
]

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forRoot(routes),
    SharedModule,
    NewsModule,
    HttpErrorHandlerModule,
  ],
  providers: [
    ApiService,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
