;
import { SearchComponent } from './search/search.component';
import { ErrorComponent } from './error/error.component'import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { BookCatalogComponent } from './book/book-catalog/book-catalog.component';
import { HomeComponent } from './home/home.component';
import { 404Component } from './404/404.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    404Component, ErrorComponent, SearchComponent,
  ],
  imports: [
    CoreModule,
    SharedModule,
    UserModule,
    BookModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
