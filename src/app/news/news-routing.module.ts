import { RouterModule, Routes } from "@angular/router";
import { NewsTableComponent } from "./news-table/news-table.component";

const routes: Routes = [
  {
    path: '',
    component: NewsTableComponent,
  }
]

export const NewsRoutes = RouterModule.forChild(routes)
