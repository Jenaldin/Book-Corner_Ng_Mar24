import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/types/book';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})

//REACTIVE
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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  onSubmit(): void {
    console.log(this.bookForm.value);
  }
}