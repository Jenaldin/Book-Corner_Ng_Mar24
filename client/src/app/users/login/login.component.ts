import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from 'src/app/core/services/user.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorHandlerService } from 'src/app/core/services/error.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  hide = true;

  private errorSubscription!: Subscription;

  constructor(
    private userApi: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private location: Location,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  ngOnInit(): void {
    this.errorSubscription = this.errorHandlerService.apiError$.subscribe(
      (errorMessage) => {
        if (errorMessage) {
          this.snackBar.open(errorMessage, 'Close', {
            duration: 5000,
          });
        }
      },
    );

    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  onLogin(formLogin: NgForm) {
    if (formLogin.invalid) {
      return;
    }

    const username = formLogin.value.username;
    const password = formLogin.value.password;

    this.userApi.login(username, password).subscribe({
      next: (response) => {
        this.snackBar.open('Your Login was successful, welcome!', 'Close', {
          duration: 5000,
        });
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorHandlerService.handleError(
          error,
          'An error occurred during login. Please try again.',
        );
      },
    });
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }
}
