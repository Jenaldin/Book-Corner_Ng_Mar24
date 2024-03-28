import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainModule } from './main/main.module';
import { SharedModule } from './shared/shared.module';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    //MainModule,
    SharedModule,
    //BooksModule,
    UsersModule,
    CommentsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
