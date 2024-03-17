import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog/catalog.component';
import { ViewBookComponent } from './view-book/view-book.component';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';



@NgModule({
  declarations: [
    CatalogComponent,
    ViewBookComponent,
    AddBookComponent,
    EditBookComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BooksModule { }
