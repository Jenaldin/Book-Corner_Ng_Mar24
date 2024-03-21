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

    const bookId = this.activeRoute.snapshot.paramMap.get('id');

    this.bookApi.getBook(bookId).subscribe((data: any) => {
      this.book = data;
      this.originalBook = { ...data };
    });

    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  onSubmit(formValue: any): void {
    // Call the service to update the book
    this.bookApi.editBook(formValue.id, formValue.title, formValue.author, formValue.genre, formValue.coverUrl, formValue.bookLang, formValue.description);
  }

  
  // onSubmit(formValue: any): void {
  //   const updatedFields = this.getUpdatedFields(this.originalBook, formValue);
  //   // Call the service to update the book with only the changed fields
  //   this.bookService.editBook(bookId, updatedFields);
  // }

  // getUpdatedFields(original: any, updated: any) {
  //   const updatedFields: any = {};
  //   for (const key in original) {
  //     if (original[key] !== updated[key]) {
  //       updatedFields[key] = updated[key];
  //     }
  //   }
  //   return updatedFields;
  // }
}
