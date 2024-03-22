import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';
import { Book } from 'src/app/types/book';

import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  books: Book[] | null = [];
  totalBooks: number = 0;
  isLoading: boolean = true;

  constructor(private bookApi: BookService, private userApi: UserService, private snackBar: MatSnackBar,) { };

  ngOnInit(): void {
    this.loadBooks(0, 6);
    this.loadTotalBooks();
  }

  loadBooks(startPage: number, endPage: number): void {
    this.isLoading = true;
    this.bookApi.getBooks(startPage, endPage).subscribe({
      next: (books) => {
        this.books = books;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      },
      error: (error) => {
        let errorMessage = 'An error occurred while fetching the books. Please try again.';

        if (error.status === 400) {
          errorMessage += ' There was a problem with the data you entered.';
        } else if (error.status === 500) {
          errorMessage += ' There was a problem with the server.';
        }

        errorMessage += ` Error message from server: ${error.error}`;

        this.snackBar.open(errorMessage, 'Close', {
          duration: 20000,
        });
      }
    })
  }

  loadTotalBooks(): void {
    this.bookApi.getTotalBooks().subscribe({
      next: (total) => {
        this.totalBooks = total;
      },
      error: (error) => {
        let errorMessage = 'An error occurred while fetching the total number books. Please try again.';

        if (error.status === 400) {
          errorMessage += ' There was a problem with the data you entered.';
        } else if (error.status === 500) {
          errorMessage += ' There was a problem with the server.';
        }

        errorMessage += ` Error message from server: ${error.error}`;

        this.snackBar.open(errorMessage, 'Close', {
          duration: 20000,
        });
      }
    });
  }

  pageChanged(event: PageEvent): void {
    const start = event.pageIndex * event.pageSize;
    const end = start + event.pageSize;
    this.loadBooks(start, end);
  }

  getStars(rating: number) {
    let fullStars = Math.floor(rating);
    let halfStars = Math.ceil(rating - fullStars);
    let emptyStars = 5 - fullStars - halfStars;

    return {
      full: Array(fullStars).fill('star'),
      half: Array(halfStars).fill('star_half'),
      empty: Array(emptyStars).fill('star_border')
    };
  }
}
