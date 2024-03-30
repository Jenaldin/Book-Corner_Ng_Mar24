import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCommentComponent } from '../add-comment/add-comment.component';

import { Comment } from 'src/app/core/types/comment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommentService } from 'src/app/core/services/comment.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-all-comments',
  templateUrl: './all-comments.component.html',
  styleUrls: ['./all-comments.component.scss']
})
export class AllCommentsComponent implements OnInit{
  @Input() bookId: string = '';
  isLoading: boolean = true;
  panelOpenState = false;
  hasResults: boolean = true;
  comments: Comment[] | null = [];
  totalComments: number = 0;
  currentPage: number = 0;

  constructor(public dialogBox: MatDialog, private snackBar: MatSnackBar, private commentsApi: CommentService) {}

  ngOnInit(): void {
    this.loadComments(0, 2);
    this.loadTotalComments();
    
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  loadComments(pageIndex: number, pageSize: number): void {
    this.isLoading = true;
    this.commentsApi.getComments(pageIndex * pageSize, pageSize).subscribe({
      next: (comments) => {
        this.comments = comments.filter(comment => {
          console.log(comment.book.toString(), this.bookId);
  return comment.book.toString() === this.bookId
        });
        console.log("Book ID to compare: " + this.bookId);
        
        console.log("Before filter: " + comments);
        console.log("After filter: " + this.comments);
        

        if (this.comments.length === 0) {
          this.hasResults = false;
        }

        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      },
      error: (error) => {
        let errorMessage =
          'An error occurred while fetching the comments. Please try again.';
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

  loadTotalComments(): void {
    this.commentsApi.getTotalComments().subscribe({
      next: (total) => {
        this.totalComments = total;
      },
      error: (error) => {
        let errorMessage =
          'An error occurred while fetching the total number comments. Please try again.';
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

  pageChanged(event: PageEvent): void {
    this.loadComments(event.pageIndex, event.pageSize);
  }

  newComment() {
    const dialogRef = this.dialogBox.open(AddCommentComponent, {
      disableClose: true,
      data: { bookId: this.bookId }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`dialog closed`);
    });
  }

}
