import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCommentComponent } from './add-comment/add-comment.component';
import { EditCommentComponent } from './edit-comment/edit-comment.component';
import { AllCommentsComponent } from './all-comments/all-comments.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AddCommentComponent,
    EditCommentComponent,
    AllCommentsComponent,
  ],
  imports: [
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatPaginatorModule,
    FormsModule,
    CommonModule,
  ],
  exports: [AddCommentComponent, EditCommentComponent, AllCommentsComponent],
})
export class CommentsModule {}
