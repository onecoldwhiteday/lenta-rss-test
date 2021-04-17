import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { CategoryStatsBarComponent } from "./category-stats-bar/category-stats-bar.component";
import { CategoryStatsPieComponent } from "./category-stats-pie/category-stats-pie.component";

@NgModule({
  declarations: [
    CategoryStatsBarComponent,
    CategoryStatsPieComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    CategoryStatsPieComponent,
    CategoryStatsBarComponent
  ]
})
export class StatsModule { }
