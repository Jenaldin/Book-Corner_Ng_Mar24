import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';
import { Book } from 'src/app/types/book';

import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  books: Book[] | null = [];
  totalBooks: number = 0;
  isLoading: boolean = true;

  constructor(private bookApi: BookService, private userApi: UserService) {};

  ngOnInit(): void {
    this.loadBooks(0, 12);
    this.loadTotalBooks();
  }

  loadBooks(startPage: number, endPage: number): void {
    this.isLoading = true;
    this.bookApi.getBooks(startPage, endPage).subscribe((books) => {
      this.books = books;
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    });
  }

  loadTotalBooks(): void { 
    this.bookApi.getTotalBooks().subscribe((total) => {
      this.totalBooks = total;
    });
  }

  pageChanged(event: PageEvent): void {
    const start = event.pageIndex * event.pageSize;
    const end = start + event.pageSize;
    this.loadBooks(start, end);
  }
}
