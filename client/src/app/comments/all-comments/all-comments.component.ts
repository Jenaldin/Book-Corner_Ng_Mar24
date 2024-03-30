import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCommentComponent } from '../add-comment/add-comment.component';

@Component({
  selector: 'app-all-comments',
  templateUrl: './all-comments.component.html',
  styleUrls: ['./all-comments.component.scss']
})
export class AllCommentsComponent implements OnInit{
  isLoading: boolean = true;
  panelOpenState = false;

  constructor(public dialogBox: MatDialog) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  newComment() {
    const dialogRef = this.dialogBox.open(AddCommentComponent, {
      disableClose: true 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
