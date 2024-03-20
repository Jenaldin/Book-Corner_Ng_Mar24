import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/types/book';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.scss']
})
export class ViewBookComponent implements OnInit {
  book = {} as Book;
  isLoading: boolean = true;

  constructor(private bookApi: BookService, private activeRoute: ActivatedRoute) { };

  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      const id = data['bookId'];

      this.bookApi.getBook(id).subscribe((book) => {
        this.book = book;

        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      });
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

  // ngOnInit(): void {
  //   this.loadBook
  // }

  // loadBook(id: string): void {
  //   this.isLoading = true;
  //   this.bookApi.getBook(id).subscribe((book) => {
  //     this.book = book;
  //     setTimeout(() => {
  //       this.isLoading = false;
  //     }, 1000);
  //   });
  // }

}
