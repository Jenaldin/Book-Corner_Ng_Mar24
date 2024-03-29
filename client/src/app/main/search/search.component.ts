import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BookService } from 'src/app/core/services/book.service';
import { SearchService } from 'src/app/core/services/search.service';
import { Book } from 'src/app/core/types/book';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  isLoading: boolean = true;
  searchResults: Book[] = [];

  ngOnInit(): void {
    if (this.searchService.searchParams) {
      const params = this.searchService.searchParams;

      this.searchBook.controls['title'].setValue(params.title);
      this.searchBook.controls['author'].setValue(params.author);
      this.searchBook.controls['genre'].setValue(params.genre);
      this.searchBook.controls['owner'].setValue(params.owner);
    }

    if (this.searchService.searchResults) {
      this.searchResults = this.searchService.searchResults;
    }

    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  genres = [
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

  searchBook = this.fb.group({
    title: [''],
    author: [''],
    genre: [''],
    owner: [''],
  });

  constructor(
    private fb: FormBuilder,
    private bookApi: BookService,
    private snackBar: MatSnackBar,
    private searchService: SearchService,
  ) {}

  onSubmit(): void {
    if (this.searchBook.valid) {
      const title = this.searchBook.value.title || '';
      const author = this.searchBook.value.author || '';
      const genre = this.searchBook.value.genre || '';
      const owner = this.searchBook.value.owner || '';

      this.bookApi.searchBooks(title, author, genre, owner).subscribe({
        next: (response) => {
          this.searchResults = response;
          this.searchService.searchParams = this.searchBook.value;
          this.searchService.searchResults = response;

          if (this.searchResults.length === 0) {
            this.snackBar.open('No Books to show at this time!', 'Close', {
              duration: 20000,
            });
          } else {
            this.snackBar.open('Book(s) found successfully!', 'Close', {
              duration: 20000,
            });
          }
        },
        error: (error) => {
          let errorMessage =
            'An error occurred while searching the book(s). Please try again.';

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
}
