import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/types/book';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls:  ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  isLoading: boolean = true;
  books: Book[] | null = [];

  constructor(private bookApi: BookService) {};

  ngOnInit(): void {
    this.loadLatest();
  }

  loadLatest(): void {
    this.isLoading = true;
    this.bookApi.getLatestBooks().subscribe((books) => {
      this.books = books;
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    });
  }

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