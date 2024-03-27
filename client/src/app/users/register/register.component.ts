import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { matchPass } from 'src/app/utils/pass-match';
import { emailValidator } from 'src/app/utils/email-valid';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isLoading: boolean = true;
  hide = true;
  hideRe = true;

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
  ) { }

  ngOnInit(): void {
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
          duration: 20000,
        });
        this.registerForm.reset();
        this.router.navigate(['/']);
      },
      error: (error) => {
        let errorMessage = 'An error occurred while registration. Please try again.';
        if (error.status === 400) {
          errorMessage += ' There was a problem with the data you entered.';
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