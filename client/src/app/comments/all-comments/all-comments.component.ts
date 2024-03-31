import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCommentComponent } from '../add-comment/add-comment.component';

import { Comment } from 'src/app/core/types/comment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommentService } from 'src/app/core/services/comment.service';
import { PageEvent } from '@angular/material/paginator';
import { UserService } from 'src/app/core/services/user.service';
import { EditCommentComponent } from '../edit-comment/edit-comment.component';
import { ErrorHandlerService } from 'src/app/core/services/error.service';

@Component({
  selector: 'app-all-comments',
  templateUrl: './all-comments.component.html',
  styleUrls: ['./all-comments.component.scss'],
})
export class AllCommentsComponent implements OnInit {
  @Input() bookId: string = '';
  @Input() hasRatedBook: boolean = false;

  isLoading: boolean = true;
  panelOpenState: boolean = false;
  hasResults: boolean = true;
  comments: Comment[] | null = [];
  totalComments: number = 0;
  currentPage: number = 0;

  constructor(
    public dialogBox: MatDialog,
    private snackBar: MatSnackBar,
    private commentApi: CommentService,
    private userApi: UserService,
    private errorHandlerService: ErrorHandlerService,
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
    this.commentApi
      .getComments(pageIndex * pageSize, pageSize, this.bookId)
      .subscribe({
        next: ({ comments, total }) => {
          this.comments = comments.sort((a, b) => {
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
          this.errorHandlerService.handleError(
            error,
            'An error occurred while fetching the comments. Please try again.',
          );
        },
      });
  }

  loadTotalComments(): void {
    this.totalComments;
  }

  pageChanged(event: PageEvent): void {
    this.loadComments(event.pageIndex, event.pageSize);
  }

  isUserVotedHelpful(comment: Comment): boolean {
    if (this.currentUserId) {
      return comment.usersVotedHelpful?.includes(this.currentUserId) || false;
    }
    return false;
  }

  newComment(): void {
    const dialogRef = this.dialogBox.open(AddCommentComponent, {
      disableClose: true,
      data: { bookId: this.bookId, hasRatedBook: this.hasRatedBook },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  editComment(
    id: string,
    title: string,
    commentBody: string,
    ratedBookWith: any,
  ): void {
    const dialogRef = this.dialogBox.open(EditCommentComponent, {
      disableClose: true,
      data: {
        commentId: id,
        hasRatedBook: this.hasRatedBook,
        title: title,
        commentBody: commentBody,
        ratedBookWith: ratedBookWith,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  deleteComment(id: string): void {
    this.commentApi.deleteComment(id).subscribe({
      next: (response) => {
        this.snackBar.open('Comment deleted successfully!', 'Close', {
          duration: 5000,
        });
        this.ngOnInit();
      },
      error: (error) => {
        this.errorHandlerService.handleError(
          error,
          'An error occurred while deleting the comment the comment. Please try again.',
        );
      },
    });
  }

  voteHelpful(id: string): void {
    const userId = this.currentUserId;
    if (userId) {
      this.commentApi.votedHelpfulYes(id, userId).subscribe({
        next: (response) => {
          this.snackBar.open(
            'You voted successfully Yes for a comment!',
            'Close',
            {
              duration: 5000,
            },
          );
          this.ngOnInit();
        },
        error: (error) => {
          this.errorHandlerService.handleError(
            error,
            'An error occurred while voting for the comment. Please try again.',
          );
        },
      });
    }
  }

  voteNotHelpful(id: string): void {
    const userId = this.currentUserId;
    if (userId) {
      this.commentApi.votedHelpfulNo(id, userId).subscribe({
        next: (response) => {
          this.snackBar.open(
            'You voted successfully No for a comment!',
            'Close',
            {
              duration: 5000,
            },
          );
          this.ngOnInit();
        },
        error: (error) => {
          this.errorHandlerService.handleError(
            error,
            'An error occurred while voting for the comment. Please try again.',
          );
        },
      });
    }
  }
}
