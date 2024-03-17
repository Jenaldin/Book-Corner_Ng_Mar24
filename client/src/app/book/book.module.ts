import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookCatalogComponent } from './book-catalog/book-catalog.component';
import { BookRoutingModule } from './book-routing.module';



@NgModule({
  declarations: [
    BookCatalogComponent
  ],
  imports: [
    CommonModule, BookRoutingModule
  ]
})
export class BookModule { }
