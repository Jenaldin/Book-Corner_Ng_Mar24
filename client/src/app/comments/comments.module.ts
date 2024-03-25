import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCommentComponent } from './add-comment/add-comment.component';
import { EditCommentComponent } from './edit-comment/edit-comment.component';
import { AllCommentsComponent } from './all-comments/all-comments.component';

@NgModule({
  declarations: [
    AddCommentComponent,
    EditCommentComponent,
    AllCommentsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AddCommentComponent,
    EditCommentComponent,
    AllCommentsComponent
  ],
})
export class CommentsModule { }
