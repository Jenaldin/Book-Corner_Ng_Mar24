import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public bookData: { bookId: string },
  ) {console.log('AddCommentComponent instantiated');
  console.log('bookData:', this.bookData);}

  addComment(formComment: NgForm) {
    if (formComment.invalid) {
      return;
    }

    const title = formComment.value.title;
    const commentBody = formComment.value.commentBody;
    const ratedBookWith = formComment.value.ratedBookWith;

    console.log("this would be a comment submitted for book ID: " + this.bookData.bookId);
    

  }
}
