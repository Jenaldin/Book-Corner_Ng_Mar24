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

  constructor(
    private userApi: UserService,
    private bookApi: BookService,
    private snackBar: MatSnackBar,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) {}

  private paramsSubscription: Subscription = new Subscription();
  @Output() currentBookData = new EventEmitter<{hasRated: boolean, bookId: string}>();

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
          if(userHasRated){
            this.hasRatedBook = true
          }        

          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        },
        error: (error) => {
          let errorMessage =
            'An error occurred while fetching the book. Please try again.';

          if (error.status === 400) {
            errorMessage += ' There was a problem with the data you entered.';
          } else if (error.status === 500) {
            errorMessage += ' There was a problem with the server.';
          } else if (JSON.stringify(error.error.message) === undefined){
            errorMessage += ' Seems there is no such book!'
          }

          errorMessage += ` Error message from server: ${JSON.stringify(error.error.message)}`;

          this.snackBar.open(errorMessage, 'Close', {
            duration: 20000,
          });
          this.router.navigate(['/404'])
        },
      });
    });
  }

  onDelete(id: string): void {
    this.bookApi.deleteBook(id).subscribe({
      next: (response) => {
        this.snackBar.open('Book deleted successfully!', 'Close', {
          duration: 20000,
        });
        this.router.navigate(['/catalog']);
      },
      error: (error) => {
        let errorMessage =
          'An error occurred while deleting the book. Please try again.';

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

  requestBook(id: string): void {
    const userId = this.currentUserId;
    const isRented = true;
    if (userId) {
      this.bookApi.requestBook(id, userId, isRented).subscribe({
        next: (response) => {
          this.snackBar.open(
            'Your request for the book is successful!',
            'Close',
            {
              duration: 20000,
            },
          );
          this.router.navigate(['/catalog']);
        },
        error: (error) => {
          let errorMessage =
            'An error occurred while making your request for the book. Please try again.';

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
              duration: 20000,
            },
          );
          this.router.navigate(['/catalog']);
        },
        error: (error) => {
          let errorMessage =
            'An error occurred while making your request for the book. Please try again.';

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
      this.currentBookData.emit({hasRated: this.hasRatedBook, bookId: this.bookId});
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
    this.paramsSubscription.unsubscribe();
  }
}
