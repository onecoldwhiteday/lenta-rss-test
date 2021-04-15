import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { NewsTableComponent } from './news-table/news-table.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CategoryStatsPieComponent } from './category-stats-pie/category-stats-pie.component';
import { CategoryStatsComponent } from './category-stats-bar/category-stats.component';
import { NewsService } from '../services/news.service';


const materialModules = [
  MatTableModule,
  MatDialogModule,
  MatCardModule,
  MatIconModule,
  MatPaginatorModule,
  MatButtonModule
]

@NgModule({
  declarations: [
    NewsTableComponent,
    NewsDetailComponent,
    CategoryStatsComponent,
    CategoryStatsPieComponent
  ],
  imports: [
    CommonModule,
    ...materialModules
  ],
  providers: [NewsService],
  entryComponents: [NewsDetailComponent],
  exports: [NewsTableComponent]
})
export class NewsModule { }
