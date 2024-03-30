import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommentService } from 'src/app/core/services/comment.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.scss'],
})
export class EditCommentComponent {
  constructor(
    private commentApi: CommentService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    public commentData: {
      commentId: string;
      hasRatedBook: boolean;
      title: string;
      commentBody: string;
      ratedBookWith: number;
    },
  ) {  }

  editComment(formComment: NgForm) {
    if (formComment.invalid) {
      return;
    }

    const title = formComment.value.title;
    const commentBody = formComment.value.commentBody;
    let ratedBookWith: number = 0;
    
    if (formComment.value.ratedBookWith == undefined) {
      ratedBookWith = this.commentData.ratedBookWith;
    } else {
      ratedBookWith = Number(formComment.value.ratedBookWith);
    }    
    
    this.commentApi
      .editComment(
        this.commentData.commentId,
        title,
        commentBody,
        ratedBookWith,
      )
      .subscribe({
        next: (response) => {
          this.snackBar.open('Comment updated successfully!', 'Close', {
            duration: 20000,
          });
        },
        error: (error) => {
          let errorMessage =
            'An error occurred while updating the comment. Please try again.';

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
}
