import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCommentComponent } from '../add-comment/add-comment.component';

import { Comment } from 'src/app/core/types/comment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommentService } from 'src/app/core/services/comment.service';
import { PageEvent } from '@angular/material/paginator';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-all-comments',
  templateUrl: './all-comments.component.html',
  styleUrls: ['./all-comments.component.scss'],
})
export class AllCommentsComponent implements OnInit {
  @Input() bookId: string = '';
  isLoading: boolean = true;
  panelOpenState = false;
  hasResults: boolean = true;
  comments: Comment[] | null = [];
  totalComments: number = 0;
  currentPage: number = 0;

  constructor(
    public dialogBox: MatDialog,
    private snackBar: MatSnackBar,
    private commentsApi: CommentService,
    private userApi: UserService
  ) {}

  get currentUserId(): string | undefined {
    return this.userApi.currentUserId;
  }

  ngOnInit(): void {
    this.loadComments(0, 10);
    this.loadTotalComments();

    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  loadComments(pageIndex: number, pageSize: number): void {
    this.isLoading = true;
    this.commentsApi.getComments(pageIndex * pageSize, pageSize, this.bookId).subscribe({
      next: ({ comments, total }) => {
        this.comments = comments.sort((a,b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
        this.totalComments = total;

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
    this.totalComments
  }

  pageChanged(event: PageEvent): void {
    this.loadComments(event.pageIndex, event.pageSize);
  }

  newComment() {
    const dialogRef = this.dialogBox.open(AddCommentComponent, {
      disableClose: true,
      data: { bookId: this.bookId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`dialog closed`);
    });
  }
}
