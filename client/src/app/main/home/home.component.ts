import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/core/services/book.service';
import { ErrorHandlerService } from 'src/app/core/services/error.service';
import { UserService } from 'src/app/core/services/user.service';
import { Book } from 'src/app/core/types/book';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  hasResults: boolean = true;
  books: Book[] | null = [];

  private errorSubscription!: Subscription;
  constructor(
    private bookApi: BookService,
    private userApi: UserService,
    private snackBar: MatSnackBar,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  get currentUser(): string | undefined {
    return this.userApi.currentUsername;
  }

  get currentUserId(): string | undefined {
    return this.userApi.currentUserId;
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

    this.loadLatest();
  }

  loadLatest(): void {
    this.isLoading = true;
    this.bookApi.getLatestBooks().subscribe((books) => {
      this.books = books;

      if (this.books.length === 0) {
        this.hasResults = false;
      }

      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    });
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
