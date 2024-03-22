import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/types/book';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.scss']
})
export class ViewBookComponent implements OnInit {
  book = {} as Book;
  isLoading: boolean = true;

  constructor(
    private bookApi: BookService,
    private snackBar: MatSnackBar,
    private activeRoute: ActivatedRoute,
    private router: Router,
  ) { };

  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      const id = data['bookId'];

      this.bookApi.getBook(id).subscribe({
        next: (book) => {
          this.book = book;
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

          errorMessage += ` Error message from server: ${JSON.stringify(error.error.message)}`;

          this.snackBar.open(errorMessage, 'Close', {
            duration: 20000,
          });
        }
      });
    });
  };

  onDelete(id: string): void {
    this.bookApi.deleteBook(id).subscribe({
      next: (response) => {

        this.snackBar.open('Book deleted successfully!', 'Close', {
          duration: 20000,
        });
        this.router.navigate(['/catalog']);
      },
      error: (error) => {
        let errorMessage = 'An error occurred while deleting the book. Please try again.';

        if (error.status === 400) {
          errorMessage += ' There was a problem with the data you entered.';
        } else if (error.status === 500) {
          errorMessage += ' There was a problem with the server.';
        }

        errorMessage += ` Error message from server: ${JSON.stringify(error.error.message)}`;

        this.snackBar.open(errorMessage, 'Close', {
          duration: 20000,
        });
      }
    });
  };

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
