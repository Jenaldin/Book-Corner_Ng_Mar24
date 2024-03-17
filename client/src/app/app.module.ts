import { NgModule } from '@angular/core';
import { SearchComponent } from './search/search.component';
import { ErrorComponent } from './error/error.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent, 
    SearchComponent,
  ],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    UserModule,
    BookModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
