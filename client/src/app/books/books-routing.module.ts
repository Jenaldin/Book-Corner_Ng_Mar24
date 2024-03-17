import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { ViewBookComponent } from './view-book/view-book.component';

const routes: Routes = [
   {
      path: 'catalog',
      children: [
         {path: '', pathMatch: 'full', component: CatalogComponent},
         {path: ':bookId', component: ViewBookComponent}
      ]
   }
 ];


@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
 })
 export class BooksRoutingModule { }