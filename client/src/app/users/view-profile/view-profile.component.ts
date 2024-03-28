import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import { emailValidator } from 'src/app/core/utils/email-valid';
import { UserService } from 'src/app/core/services/user.service';
import { UserDetailed } from 'src/app/core/types/user';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  isLoading: boolean = true;
  user = {} as UserDetailed;

  get currentUser(): string | undefined {
    return this.userApi.currentUsername;
  };

  get currentUserId(): string | undefined {
    return this.userApi.currentUserId;
  };

  constructor(
    private userApi: UserService,
    private snackBar: MatSnackBar,
    private activeRoute: ActivatedRoute,
  ) { };

  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      const id = data['userId'];

      this.userApi.getProfile(id).subscribe({
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

    });
  }
}
