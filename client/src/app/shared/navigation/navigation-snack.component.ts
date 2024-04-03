import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation-snack',
  template: `<span
    >Hi there, guest, you must be logged in to view this page.
    <a href="/users/login">Login from here</a></span
  >`,
  styles: [
    `
      a {
        color: #ffd640;
        text-decoration: none;
        font-weight: 500;
      }
    `,
  ],
})
export class NavigationSnackComponent {}
