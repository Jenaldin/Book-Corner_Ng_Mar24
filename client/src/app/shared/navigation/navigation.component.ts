import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandlerService } from 'src/app/core/services/error.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit, OnDestroy{
  private errorSubscription!: Subscription;
  
  constructor(
    private userApi: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  get loggedIn(): boolean {
    return this.userApi.isLoggedIn;
  }

  get currentUser(): string | undefined {
    return this.userApi.currentUsername;
  }

  ngOnInit(): void {
    this.errorSubscription = this.errorHandlerService.apiError$.subscribe(
      errorMessage => {
        if (errorMessage) {
          this.snackBar.open(errorMessage, 'Close', {
            duration: 5000,
          });
        }
      }
    );
  }

  logout() {
    this.userApi.logout().subscribe({
      next: (response) => {
        this.snackBar.open(
          'Your Logout was successful, see you later!',
          'Close',
          {
            duration: 5000,
          },
        );
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorHandlerService.handleError(
          error,
          'An error occurred while you tried to logout. Please try again.',
        );
      },
    });
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }
}
