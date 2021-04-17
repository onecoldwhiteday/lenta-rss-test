import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { StatsModule } from '../stats/stats.module';
import { NewsTableComponent } from './news-table/news-table.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { SharedModule } from '../shared/shared.module';
import { NewsService } from '../../services/news.service';
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: NewsTableComponent,
  }
]


const materialModules = [
  MatTableModule,
  MatDialogModule,
  MatCardModule,
  MatIconModule,
  MatPaginatorModule,
  MatButtonModule,
  MatSortModule
]

@NgModule({
  declarations: [
    NewsTableComponent,
    NewsDetailComponent,
  ],
  imports: [
    CommonModule,
    StatsModule,
    SharedModule,
    RouterModule.forChild(routes),
    ...materialModules
  ],
  providers: [NewsService],
  entryComponents: [NewsDetailComponent],
  exports: [NewsTableComponent]
})
export class NewsModule { }
