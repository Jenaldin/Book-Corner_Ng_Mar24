import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { MatSnackBar } from '@angular/material/snack-bar';

import { emailValidator } from 'src/app/core/utils/email-valid';
import { UserService } from 'src/app/core/services/user.service';
import { UserDetailed } from 'src/app/core/types/user';
import { ErrorHandlerService } from 'src/app/core/services/error.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  showEditMode: boolean = false;
  user = {} as UserDetailed;

  private errorSubscription!: Subscription;

  get currentUser(): string | undefined {
    return this.userApi.currentUsername;
  };

  get currentUserId(): string | undefined {
    return this.userApi.currentUserId;
  };

  constructor(
    private userApi: UserService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private location: Location,
    private errorHandlerService: ErrorHandlerService,
  ) { };

  editUserForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z\u00C0-\u017F\'\u0400-\u04FF]+(-[a-zA-Z\u00C0-\u017F\'\u0400-\u04FF]+)*$')]],
    lastName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z\u00C0-\u017F\'\u0400-\u04FF]+(-[a-zA-Z\u00C0-\u017F\'\u0400-\u04FF]+)*$')]],
    email: ['', [Validators.required, Validators.minLength(10), emailValidator()]],
    avatar: ['', [Validators.required, Validators.pattern(/https?:\/\/.+\.(jpg|jpeg|png|gif)/i)]],
    aboutMe: ['', [Validators.maxLength(2000)]],
  });

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

    const userId = this.currentUserId;

    if (userId) {
      this.userApi.getMyUser(userId).subscribe({
        next: (user) => {
          this.user = user;
          const { firstName, lastName, email, avatar, aboutMe } = this.user

          this.editUserForm.setValue({ firstName, lastName, email, avatar, aboutMe });

          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        },
        error: (error) => {
          this.errorHandlerService.handleError(
            error,
            'An error occurred while fetching the user. Please try again.',
          );
        }
      });
    }
  };

  onEditUser(): void {
    if (this.editUserForm.invalid) {
      return;
    }

    const userId = this.currentUserId;
    const updatedFields = this.getUpdatedFields(this.user, this.editUserForm.value);

    if (userId) {
      this.userApi.editMyUser(userId, updatedFields).subscribe({
        next: (response) => {
          this.snackBar.open('User profile updated successfully!', 'Close', {
            duration: 5000,
          });
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.errorHandlerService.handleError(
            error,
            'An error occurred while updating your profile. Please try again.',
          );
        }
      })
    } else {
      this.snackBar.open(`Looks like something broke and your profile is unavailable! Please try again later`, 'Close', {
        duration: 10000,
      });
    };
  };

  getUpdatedFields(original: any, updated: any) {
    const updatedFields: any = {};
    for (const key in original) {
      if (updated.hasOwnProperty(key) && original[key] !== updated[key]) {
        updatedFields[key] = updated[key];
      }
    }
    return updatedFields;
  };

  goBack() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }
}
