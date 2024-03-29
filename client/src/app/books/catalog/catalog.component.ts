import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BookService } from 'src/app/core/services/book.service';
import { UserService } from 'src/app/core/services/user.service';
import { Book } from 'src/app/core/types/book';

import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  books: Book[] | null = [];
  totalBooks: number = 0;
  currentPage: number = 0;
  isLoading: boolean = true;
  hasResults: boolean = true;

  constructor(
    private bookApi: BookService,
    private userApi: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) {}

  get loggedIn(): boolean {
    return this.userApi.isLoggedIn;
  }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((params) => {
      const page = params['page'] ? +params['page'] : 0;

      this.loadBooks(page, 6);
    });
    this.loadTotalBooks();
  }

  loadBooks(pageIndex: number, pageSize: number): void {
    this.isLoading = true;
    this.bookApi.getBooks(pageIndex * pageSize, pageSize).subscribe({
      next: (books) => {
        this.books = books;

        if (this.books.length === 0) {
          this.hasResults = false;
        }

        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      },
      error: (error) => {
        let errorMessage =
          'An error occurred while fetching the books. Please try again.';
        if (error.status === 400) {
          errorMessage += ' There was a problem with the data you entered.';
        } else if (error.status === 500) {
          errorMessage += ' There was a problem with the server.';
        }
        errorMessage += ` Error message from server: ${JSON.stringify(error.error.message)}`;
        this.snackBar.open(errorMessage, 'Close', {
          duration: 20000,
        });
      },
    });
  }

  loadTotalBooks(): void {
    this.bookApi.getTotalBooks().subscribe({
      next: (total) => {
        this.totalBooks = total;
      },
      error: (error) => {
        let errorMessage =
          'An error occurred while fetching the total number books. Please try again.';
        if (error.status === 400) {
          errorMessage += ' There was a problem with the data you entered.';
        } else if (error.status === 500) {
          errorMessage += ' There was a problem with the server.';
        }
        errorMessage += ` Error message from server: ${JSON.stringify(error.error.message)}`;
        this.snackBar.open(errorMessage, 'Close', {
          duration: 20000,
        });
      },
    });
  }

  pageChanged(event: PageEvent): void {
    this.router.navigate([], { queryParams: { page: event.pageIndex } });
    this.loadBooks(event.pageIndex, event.pageSize);
  }

  getStars(rating: number) {
    let fullStars = Math.floor(rating);
    let halfStars = Math.ceil(rating - fullStars);
    let emptyStars = 5 - fullStars - halfStars;

    return {
      full: Array(fullStars).fill('star'),
      half: Array(halfStars).fill('star_half'),
      empty: Array(emptyStars).fill('star_border'),
    };
  }
}
