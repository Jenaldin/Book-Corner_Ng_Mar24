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

  constructor(private bookApi: BookService, private activeRoute: ActivatedRoute) {};

  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      const id = data['bookId'];

      this.bookApi.getBook(id).subscribe((book) => {
        this.book = book;
      });
    });
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
