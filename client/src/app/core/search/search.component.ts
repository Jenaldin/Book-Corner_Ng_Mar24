import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  isLoading: boolean = true;
  ngOnInit(): void {
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
    owner: ['']
  });

  constructor(private fb: FormBuilder, private bookApi: BookService, private snackBar: MatSnackBar, private router: Router) { }

  onSubmit(): void {
    if (this.searchBook.valid) {
      const title = this.searchBook.value.title || '';
      const author = this.searchBook.value.author || '';
      const genre = this.searchBook.value.genre || '';
      const owner = this.searchBook.value.owner || '';

      // this.bookApi.searchBooks(title, author, genre, owner).subscribe({
      //   next: (response) => {

      //     this.snackBar.open('Book added successfully!', 'Close', {
      //       duration: 20000,
      //     });
      //   },
      //   error: (error) => {
      //     let errorMessage = 'An error occurred while adding the book. Please try again.';

      //     if (error.status === 400) {
      //       errorMessage += ' There was a problem with the data you entered.';
      //     } else if (error.status === 500) {
      //       errorMessage += ' There was a problem with the server.';
      //     }

      //     errorMessage += ` Error message from server: ${JSON.stringify(error.error.message)}`;

      //     this.snackBar.open(errorMessage, 'Close', {
      //       duration: 20000,
      //     });
      //   }
      // });
    }
  }
}