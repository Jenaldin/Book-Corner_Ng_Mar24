import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { ViewBookComponent } from './view-book/view-book.component';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';

const routes: Routes = [
   {
      path: 'catalog',
      children: [
         { path: '', pathMatch: 'full', component: CatalogComponent },
         {
            path: ':bookId',
            children: [
               { path: '', pathMatch: 'full', component: ViewBookComponent },
               { path: 'edit-book', component: EditBookComponent }
            ]
         }
      ]
   },
   {
      path: 'add-book',
      component: AddBookComponent
   },
];


@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class BooksRoutingModule { }