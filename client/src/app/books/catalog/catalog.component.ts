import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BookService } from 'src/app/core/services/book.service';
import { UserService } from 'src/app/core/services/user.service';
import { Book } from 'src/app/core/types/book';

import { PageEvent } from '@angular/material/paginator';
import { ErrorHandlerService } from 'src/app/core/services/error.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit, OnDestroy {
  books: Book[] | null = [];
  totalBooks: number = 0;
  currentPage: number = 0;
  isLoading: boolean = true;
  hasResults: boolean = true;

  private errorSubscription!: Subscription;

  constructor(
    private bookApi: BookService,
    private userApi: UserService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  get loggedIn(): boolean {
    return this.userApi.isLoggedIn;
  }

  ngOnInit(): void {
    this.errorSubscription = this.errorHandlerService.apiError$.subscribe(
      (errorMessage) => {
        if (errorMessage) {
          this.snackBar.open(errorMessage, 'Close', {
            duration: 5000,
          });
        }
      },
    );

    this.activeRoute.queryParams.subscribe((params) => {
      const page = params['page'] ? +params['page'] : 0;

      this.loadBooks(page, 6);
    });
    this.loadTotalBooks();
  }

  loadBooks(pageIndex: number, pageSize: number): void {
    this.isLoading = true;
    this.bookApi.getBooks(pageIndex * pageSize, pageSize).subscribe({
      next: ({ books, total }) => {
        this.books = books;
        this.totalBooks = total;

        if (this.books.length === 0) {
          this.hasResults = false;
        }

        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      },
      error: (error) => {
        this.errorHandlerService.handleError(
          error,
          'An error occurred while fetching the books. Please try again.',
        );
      },
    });
  }

  loadTotalBooks(): void {
    this.totalBooks;
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

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }
}
