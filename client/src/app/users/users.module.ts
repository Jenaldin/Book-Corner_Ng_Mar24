import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersRoutingModule } from './users-routing.module';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    CommonModule,
    UsersRoutingModule
  ],
  exports: [
  ]
})
export class UsersModule { }
