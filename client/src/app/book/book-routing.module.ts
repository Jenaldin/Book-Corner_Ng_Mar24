import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookCatalogComponent } from './book-catalog/book-catalog.component';

const routes: Routes =[
   {
      path: 'books',
      children:[
         {path: '', pathMatch: 'full', component: BookCatalogComponent}
      ]
   }
]

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
 })
 export class BookRoutingModule {}