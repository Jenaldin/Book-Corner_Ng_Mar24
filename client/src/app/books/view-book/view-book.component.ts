import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from 'src/app/core/services/user.service';
import { BookService } from 'src/app/core/services/book.service';
import { Book } from 'src/app/core/types/book';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ErrorHandlerService } from 'src/app/core/services/error.service';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.scss'],
})
export class ViewBookComponent implements OnInit, OnDestroy {
  book = {} as Book;
  isLoading: boolean = true;
  isOwner: boolean = false;
  showComments: boolean = false;
  hasRented: boolean = false;
  bookId: string = '';
  hasRatedBook: boolean = false;

  private errorSubscription!: Subscription;
  private paramsSubscription: Subscription = new Subscription();
  @Output() currentBookData = new EventEmitter<{
    hasRated: boolean;
    bookId: string;
  }>();

  constructor(
    private userApi: UserService,
    private bookApi: BookService,
    private snackBar: MatSnackBar,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  get loggedIn(): boolean {
    return this.userApi.isLoggedIn;
  }

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

    this.paramsSubscription = this.activeRoute.params.subscribe((data) => {
      const id = data['bookId'];
      this.bookApi.getBook(id).subscribe({
        next: (book) => {
          this.book = book;
          if (book.owner._id === this.currentUserId) {
            this.isOwner = true;
          }

          const userHasRented = book.requestedBy?.some(
            (u) => u.user?._id === this.currentUserId,
          );
          if (userHasRented) {
            this.hasRented = true;
          }

          const userHasRated = book.usersWhoRated?.some(
            (userId) => userId.toString() === this.currentUserId,
          );
          if (userHasRated) {
            this.hasRatedBook = true;
          }

          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        },
        error: (error) => {
          this.errorHandlerService.handleError(
            error,
            'An error occurred while fetching the book. Please try again.',
          );
          this.router.navigate(['/404']);
        },
      });
    });
  }

  onDelete(id: string): void {
    this.bookApi.deleteBook(id).subscribe({
      next: (response) => {
        this.snackBar.open('Book deleted successfully!', 'Close', {
          duration: 5000,
        });
        this.router.navigate(['/catalog']);
      },
      error: (error) => {
        this.errorHandlerService.handleError(
          error,
          'An error occurred while deleting the book. Please try again.',
        );
      },
    });
  }

  requestBook(id: string): void {
    const userId = this.currentUserId;
    const isRented = true;
    if (userId) {
      this.bookApi.requestBook(id, userId, isRented).subscribe({
        next: (response) => {
          this.snackBar.open('Your requested the book successfully!', 'Close', {
            duration: 5000,
          });
          this.router.navigate(['/catalog']);
        },
        error: (error) => {
          this.errorHandlerService.handleError(
            error,
            'An error occurred while making your request for the book. Please try again.',
          );
        },
      });
    }
  }

  cancelRequest(id: string): void {
    const userId = this.currentUserId;
    if (userId) {
      this.bookApi.cancelRequest(id, userId).subscribe({
        next: (response) => {
          this.snackBar.open(
            'You cancelled your book request successfully!',
            'Close',
            {
              duration: 5000,
            },
          );
          this.router.navigate(['/catalog']);
        },
        error: (error) => {
          this.errorHandlerService.handleError(
            error,
            'An error occurred while canceling your request. Please try again.',
          );
        },
      });
    }
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

  onToggle(): void {
    this.showComments = !this.showComments;
  }

  sendBookData() {
    this.paramsSubscription = this.activeRoute.params.subscribe((data) => {
      this.bookId = data['bookId'];
      this.currentBookData.emit({
        hasRated: this.hasRatedBook,
        bookId: this.bookId,
      });
    });
  }

  toggleAndSendBookData() {
    this.onToggle();
    this.sendBookData();
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
    this.paramsSubscription.unsubscribe();
  }
}
