import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NavigationComponent } from './navigation/navigation.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, NavigationComponent],
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    CommonModule,
    RouterModule,
  ],
  exports: [HeaderComponent, FooterComponent, NavigationComponent],
})
export class SharedModule {}
