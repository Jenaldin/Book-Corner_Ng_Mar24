import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';
import { Book } from 'src/app/types/book';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls:  ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  isLoading: boolean = true;
  hasResults: boolean = true;
  books: Book[] | null = [];

  constructor(private bookApi: BookService, private userApi: UserService) {};

  get currentUser(): string | undefined {
    return this.userApi.currentUsername;
  };

  get currentUserId(): string | undefined {
    return this.userApi.currentUserId;
  };

  ngOnInit(): void {
    this.loadLatest();
  }

  loadLatest(): void {
    this.isLoading = true;
    this.bookApi.getLatestBooks().subscribe((books) => {
      this.books = books;
      
      if(this.books.length === 0){
        console.log("Yes");
        this.hasResults = false;
      }
      
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