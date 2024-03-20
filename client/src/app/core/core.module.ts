import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ErrorComponent } from './error/error.component';
import { SearchComponent } from './search/search.component';
import { RouterModule } from '@angular/router';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ErrorComponent,
    SearchComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    HomeComponent,
    AboutComponent,
    ErrorComponent,
    SearchComponent
  ]
})
export class CoreModule { }
