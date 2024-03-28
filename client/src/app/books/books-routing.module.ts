import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CatalogComponent } from './catalog/catalog.component';
import { ViewBookComponent } from './view-book/view-book.component';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { AuthActive } from '../core/guards/auth.activate';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', pathMatch: 'full', component: CatalogComponent },
      {
        path: 'add-book',
        component: AddBookComponent,
        canActivate: [AuthActive],
      },
      {
        path: ':bookId',
        children: [
          { path: '', pathMatch: 'full', component: ViewBookComponent },
          {
            path: 'edit-book',
            component: EditBookComponent,
            canActivate: [AuthActive],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
