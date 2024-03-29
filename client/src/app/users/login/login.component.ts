import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from 'src/app/core/services/user.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading: boolean = true;
  hide = true;

  constructor(
    private userApi: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private location: Location,
  ) {}

  ngOnInit(): void {
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
          duration: 20000,
        });
        this.router.navigate(['/']);
      },
      error: (error) => {
        let errorMessage =
          'An error occurred while registration. Please try again.';
        if (error.status === 400) {
          errorMessage += ' There was a problem with the data you entered.';
        } else if (error.status === 500) {
          errorMessage += ' There was a problem with the server.';
        }
        errorMessage += ` Error message from server: ${JSON.stringify(error.error.message)}`;
        this.snackBar.open(errorMessage, 'Close', {
          duration: 20000,
        });
      },
    });
  }

  goBack() {
    this.location.back();
  }
}
