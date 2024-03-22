import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})

export class AddBookComponent implements OnInit {
  isLoading: boolean = true;

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

  bookForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    author: ['', [Validators.required, Validators.minLength(2)]],
    genre: ['', Validators.required],
    coverUrl: ['', [Validators.required, Validators.pattern('https://.+\.(jpg|jpeg|png|gif)')]],
    bookLang: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    description: ['', [Validators.required, Validators.minLength(100), Validators.maxLength(2000)]],
  });

  constructor(
    private fb: FormBuilder,
    private bookApi: BookService,
    private activeRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const title = this.bookForm.value.title || '';
      const author = this.bookForm.value.author || '';
      const genre = this.bookForm.value.genre || '';
      const coverUrl = this.bookForm.value.coverUrl || '';
      const bookLang = this.bookForm.value.bookLang || '';
      const description = this.bookForm.value.description || '';

      this.bookApi.addBook(title, author, genre, coverUrl, bookLang, description).subscribe({
        next: (response) => {

          this.snackBar.open('Book added successfully!', 'Close', {
            duration: 20000,
          });
          this.bookForm.reset();
          this.router.navigate(['/catalog']);
        },
        error: (error) => {
          let errorMessage = 'An error occurred while adding the book. Please try again.';

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
    }
  }
}