import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  constructor(private userApi: UserService, private router: Router, private snackBar: MatSnackBar,) { }

  get loggedIn(): boolean {
    return this.userApi.isLoggedIn;
  }

  get currentUser(): string | undefined {
    return this.userApi.currentUsername;
  };

  logout() {
    this.userApi.logout().subscribe({
      next: (response) => {
        this.snackBar.open('Your Logout was successful, see you later!', 'Close', {
          duration: 20000,
        });
        this.router.navigate(['/']);
      },
      error: (error) => {
        let errorMessage = 'An error occurred while logout. Please try again.';
        if (error.status === 400) {
          errorMessage += ' There was a problem with the data you sent.';
        } else if (error.status === 500) {
          errorMessage += ' There was a problem with the server.';
        }
        errorMessage += ` Error message from server: ${JSON.stringify(error.error.message)}`;
        this.snackBar.open(errorMessage, 'Close', {
          duration: 20000,
        });
      }
    })
  }
}
