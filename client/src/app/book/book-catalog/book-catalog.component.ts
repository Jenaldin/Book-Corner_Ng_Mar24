import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-book-catalog',
  templateUrl: './book-catalog.component.html',
  styleUrls: ['./book-catalog.component.scss']
})
export class BookCatalogComponent implements OnInit{
  constructor(private api: ApiService) {};

  ngOnInit(): void {
    this.api.getBooks().subscribe((books) =>{
      console.log(books);
      //this.books = books
    });
  }

}
