import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import { emailValidator } from 'src/app/utils/email-valid';
import { UserService } from 'src/app/services/user.service';
import { UserDetailed } from 'src/app/types/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isLoading: boolean = true;
  showEditMode: boolean = false;
  user = {} as UserDetailed;

  get currentUser(): string | undefined {
    return this.userApi.currentUsername;
  }

  get currentUserId(): string | undefined {
    return this.userApi.currentUserId;
  }

  constructor(
    private userApi: UserService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { };

  userDetails: UserDetailed = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    avatar: '',
    aboutMe: '',
    booksOwned: [],
    booksRequested: [],
  }

  editUserForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z]+(-[a-zA-Z]+)*$')]],
    lastName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z]+(-[a-zA-Z]+)*$')]],
    email: ['', [Validators.required, Validators.minLength(10), emailValidator()]],
    avatar: ['', Validators.pattern(/https:\/\/.+\.(jpg|jpeg|png|gif)/i)],
    aboutMe: ['', [Validators.minLength(100), Validators.maxLength(2000)]],
  });

  ngOnInit(): void {
    const userId = this.currentUserId;

    if(userId){
      this.userApi.getUser(userId).subscribe({
        next: (user) => {
          this.user = user;
          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        },
        error: (error) => {
          let errorMessage = 'An error occurred while fetching the user. Please try again.';
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
      });
    }
  }

  onEditUser(): void {

  }

}
