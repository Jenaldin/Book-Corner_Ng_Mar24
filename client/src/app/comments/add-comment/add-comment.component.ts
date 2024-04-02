import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { CommentService } from 'src/app/core/services/comment.service';
import { ErrorHandlerService } from 'src/app/core/services/error.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit, OnDestroy{
  private errorSubscription!: Subscription;

  constructor(
    private commentApi: CommentService,
    private snackBar: MatSnackBar,
    private errorHandlerService: ErrorHandlerService,
    @Inject(MAT_DIALOG_DATA) public bookData: { bookId: string; hasRatedBook:boolean },
  ) { }

  ngOnInit(): void {
    this.errorSubscription = this.errorHandlerService.apiError$.subscribe(
      errorMessage => {
        if (errorMessage) {
          this.snackBar.open(errorMessage, 'Close', {
            duration: 5000,
          });
        }
      }
    );
  }

  addComment(formComment: NgForm) {
    if (formComment.invalid) {
      return;
    }

    const title = formComment.value.title;
    const commentBody = formComment.value.commentBody;
    let ratedBookWith: number = 0
    
    if(formComment.value.ratedBookWith === undefined){
      ratedBookWith = 0
    } else {
      ratedBookWith = Number(formComment.value.ratedBookWith);
    }
 
    const book = this.bookData.bookId    
    
    this.commentApi.addComment(book, title, commentBody, ratedBookWith).subscribe({
      next: (response) => {
        this.snackBar.open('Your Comment was submitted successfully', 'Close', {
          duration: 5000,
        });
      },
      error: (error) => {
        this.errorHandlerService.handleError(
          error,
          'An error occurred while posting the comment. Please try again.',
        );
      },
    });
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }
}
