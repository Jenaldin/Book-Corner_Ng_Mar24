import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/types/book';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {
  isLoading: boolean = true;
  book = {} as Book;
  originalBook = {} as Book;

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
  ) { }

  ngOnInit(): void {
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
          let errorMessage = 'An error occurred while fetching the book. Please try again.';

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
    } else {
      this.snackBar.open(`Looks like this book does not exist! Try another one.`, 'Close', {
        duration: 20000,
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
            duration: 20000,
          });
          this.router.navigate(['/catalog']);
        },
        error: (error) => {
          let errorMessage = 'An error occurred while updating the book. Please try again.';

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
    } else {
      this.snackBar.open(`Looks like this book does not exist! Try another one.`, 'Close', {
        duration: 20000,
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
  }
}
