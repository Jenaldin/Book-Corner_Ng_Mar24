import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from 'src/app/core/services/user.service';
import { matchPass } from 'src/app/core/utils/pass-match';
import { emailValidator } from 'src/app/core/utils/email-valid';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorHandlerService } from 'src/app/core/services/error.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  hide = true;
  hideRe = true;

  private errorSubscription!: Subscription;

  registerForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('^[a-zA-Z\u00C0-\u017F\'\u0400-\u04FF]+(-[a-zA-Z\u00C0-\u017F\'\u0400-\u04FF]+)*$')]],
    lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[a-zA-Z\u00C0-\u017F\'\u0400-\u04FF]+(-[a-zA-Z\u00C0-\u017F\'\u0400-\u04FF]+)*$')]],
    username: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9_-]+$')]],
    email: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50), emailValidator()]],
    passGroup: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]],
        rePassword: ['', [Validators.required]],
      },
      {
        validators: [matchPass('password', 'rePassword')],
      }
    ),
    avatar: ['', [Validators.required, Validators.pattern(/https?:\/\/.+\.(jpg|jpeg|png|gif)/i)]],
  });

  get passGroup() {
    return this.registerForm.get('passGroup');
  }

  constructor(
    private fb: FormBuilder,
    private userApi: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private location: Location,
    private errorHandlerService: ErrorHandlerService,
  ) { }

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

  onRegister(): void {
    if (this.registerForm.invalid) {
      return
    };

    const {
      firstName,
      lastName,
      username,
      email,
      passGroup: { password, rePassword } = {},
      avatar
    } = this.registerForm.value;

    this.userApi.register(firstName!, lastName!, username!, email!, password!, rePassword!, avatar!).subscribe({
      next: (response) => {
        this.snackBar.open('Your Registration was successful, welcome!', 'Close', {
          duration: 5000,
        });
        this.registerForm.reset();
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorHandlerService.handleError(
          error,
          'An error occurred during registration. Please try again.',
        );
      }
    })
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }
}