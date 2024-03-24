import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthActive, } from '../guards/auth.activate';
import { GuestActive } from '../guards/guest.activate';

const routes: Routes = [
  {path: 'login', component: LoginComponent,canActivate: [GuestActive]},
  {path: 'register', component: RegisterComponent, canActivate: [GuestActive]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthActive]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
