import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../main/home/home.component';
import { NotFoundComponent } from '../main/not-found/not-found.component';
import { AboutComponent } from '../main/about/about.component';
import { SearchComponent } from '../main/search/search.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', pathMatch: 'full', component: HomeComponent },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'search',
        component: SearchComponent,
      },
      {
        path: 'login',
        pathMatch: 'full',
        redirectTo: '/users/login',
      },
      {
        path: 'register',
        pathMatch: 'full',
        redirectTo: '/users/register',
      },
      {
        path: 'logout',
        pathMatch: 'full',
        redirectTo: '/users/logout',
      },
      {
        path: '404',
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
