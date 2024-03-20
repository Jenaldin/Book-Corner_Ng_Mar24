import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';
import { Book } from 'src/app/types/book';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit{
  books: Book[] | null = [];
  isLoading: boolean = true;

  constructor(private bookApi: BookService, private userApi: UserService) {};

  // get isLoggedIn(): boolean {
  //   return this.userApi.isLoggedIn;
  // }

  ngOnInit(): void {
    this.bookApi.getBooks().subscribe((books) => {
      this.books = books;

      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    })
  }
}
