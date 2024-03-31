import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { BookService } from 'src/app/core/services/book.service';
import { Book } from 'src/app/core/types/book';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorHandlerService } from 'src/app/core/services/error.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  book = {} as Book;
  originalBook = {} as Book;

  private errorSubscription!: Subscription;

  genres: string[] = [
    'Fantasy',
    'Sci-Fi',
    'Dystopian',
    'Romance',
    'Mystery/Crime',
    'Thriller/Horror',
    'Children`s books (0-12)',
    'Young Adult (13-18)',
    'Biography/Autobiography',
    'Self-help',
    'True Crime',
    'Travel',
    'Guide/How-To',
    'Science Studies (Chemistry, Physics, Mathematics, Biology, Medicine, etc.)',
    'Humanitarian Studies (History, Geography, Philosophy, Psychology, Art, etc.)',
    'Other',
  ];

  constructor(
    private bookApi: BookService,
    private activeRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private location: Location,
    private errorHandlerService: ErrorHandlerService
  ) { }

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

    const bookId = this.activeRoute.snapshot.paramMap.get('bookId');

    if (bookId) {
       this.bookApi.getBook(bookId).subscribe({
        next: (data: any) => {
          this.book = data;
          this.originalBook = { ...data };
          
          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        },
        error: (error) => {
          this.errorHandlerService.handleError(
            error,
            'An error occurred while fetching the book. Please try again.',
          );
        }
      });
    } else {
      this.snackBar.open(`Looks like this book does not exist! Try another one.`, 'Close', {
        duration: 10000,
      });
    };
  }

  onSubmit(formValue: any): void {
    const bookId = this.activeRoute.snapshot.paramMap.get('bookId');
    const updatedFields = this.getUpdatedFields(this.originalBook, formValue);

    if (bookId) {
      this.bookApi.editBook(bookId, updatedFields).subscribe({
        next: (response) => {
          this.snackBar.open('Book updated successfully!', 'Close', {
            duration: 5000,
          });
          this.router.navigate(['/catalog']);
        },
        error: (error) => {
          this.errorHandlerService.handleError(
            error,
            'An error occurred while updating the book. Please try again.',
          );
        }
      });
    } else {
      this.snackBar.open(`Looks like this book does not exist! Try another one.`, 'Close', {
        duration: 10000,
      });
    };
  }

  getUpdatedFields(original: any, updated: any) {
    const updatedFields: any = {};
    for (const key in original) {
      if (updated.hasOwnProperty(key) && original[key] !== updated[key]) {
        updatedFields[key] = updated[key];
      }
    }
    return updatedFields;
  };

  goBack() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }
}