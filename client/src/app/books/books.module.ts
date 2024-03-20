import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog/catalog.component';
import { ViewBookComponent } from './view-book/view-book.component';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { BooksRoutingModule } from './books-routing.module';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    CatalogComponent,
    ViewBookComponent,
    AddBookComponent,
    EditBookComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    MatGridListModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    BooksRoutingModule,
  ],
  exports: [
  ]
})
export class BooksModule { }
