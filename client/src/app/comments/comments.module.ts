import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllComentsComponent } from './all-coments/all-coments.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { EditCommentComponent } from './edit-comment/edit-comment.component';



@NgModule({
  declarations: [
    AllComentsComponent,
    AddCommentComponent,
    EditCommentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CommentsModule { }
