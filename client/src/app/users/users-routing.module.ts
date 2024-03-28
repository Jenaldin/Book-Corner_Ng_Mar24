import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthActive } from '../core/guards/auth.activate';
import { guestActive } from '../core/guards/guest.activate';
import { ViewProfileComponent } from './view-profile/view-profile.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/users/profile' },
      { path: 'login', component: LoginComponent, canActivate: [guestActive()] },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [guestActive()],
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: ProfileComponent,
            canActivate: [AuthActive],
          },
          {
            path: ':userId',
            component: ViewProfileComponent,
            canActivate: [AuthActive],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
