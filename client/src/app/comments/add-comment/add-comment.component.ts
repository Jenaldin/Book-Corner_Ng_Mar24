import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommentService } from 'src/app/core/services/comment.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent {

  constructor(
    private commentApi: CommentService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public bookData: { bookId: string; hasRatedBook:boolean },
  ) {console.log('AddCommentComponent instantiated');
  console.log('bookData:', this.bookData);}

  addComment(formComment: NgForm) {
    if (formComment.invalid) {
      return;
    }

    const title = formComment.value.title;
    const commentBody = formComment.value.commentBody;
    let ratedBookWith: number = 0
    
    if(formComment.value.ratedBookWith == ''){
      ratedBookWith = 0
    }
    ratedBookWith = Number(formComment.value.ratedBookWith);
    const book = this.bookData.bookId    
    
    this.commentApi.addComment(book, title, commentBody, ratedBookWith).subscribe({
      next: (response) => {
        this.snackBar.open('Your Comment was submitted successfully', 'Close', {
          duration: 20000,
        });
      },
      error: (error) => {
        let errorMessage =
          'An error occurred while posting the comment. Please try again.';
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
