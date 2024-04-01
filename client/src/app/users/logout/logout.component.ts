import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandlerService } from 'src/app/core/services/error.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit, OnDestroy{

  private errorSubscription!: Subscription;
  
  constructor(
    private userApi: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private errorHandlerService: ErrorHandlerService,
  ) {}

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

  logout() {
    
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }
}
