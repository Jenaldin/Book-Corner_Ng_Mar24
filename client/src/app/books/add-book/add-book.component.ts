import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { BookService } from 'src/app/core/services/book.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorHandlerService } from 'src/app/core/services/error.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;

  private errorSubscription!: Subscription;

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
    title: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(256)],
    ],
    author: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(256)],
    ],
    genre: ['', Validators.required],
    averageRating: ['', Validators.required],
    coverUrl: [
      '',
      [
        Validators.required,
        Validators.pattern(/https:\/\/.+\.(jpg|jpeg|png|gif)/i),
      ],
    ],
    bookLang: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(30)],
    ],
    description: [
      '',
      [
        Validators.required,
        Validators.minLength(100),
        Validators.maxLength(2000),
      ],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private bookApi: BookService,
    private snackBar: MatSnackBar,
    private router: Router,
    private location: Location,
    private errorHandlerService: ErrorHandlerService,
  ) {}

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

    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const title = this.bookForm.value.title || '';
      const author = this.bookForm.value.author || '';
      const genre = this.bookForm.value.genre || '';
      const averageRating = Number(this.bookForm.value.averageRating) || 1;
      const coverUrl = this.bookForm.value.coverUrl || '';
      const bookLang = this.bookForm.value.bookLang || '';
      const description = this.bookForm.value.description || '';

      this.bookApi
        .addBook(
          title,
          author,
          genre,
          averageRating,
          coverUrl,
          bookLang,
          description,
        )
        .subscribe({
          next: (response) => {
            this.snackBar.open('Book added successfully!', 'Close', {
              duration: 5000,
            });
            this.bookForm.reset();
            this.router.navigate(['/catalog']);
          },
          error: (error) => {
            this.errorHandlerService.handleError(
              error,
              'An error occurred while adding the book. Please try again.',
            );
          },
        });
    }
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }
}
