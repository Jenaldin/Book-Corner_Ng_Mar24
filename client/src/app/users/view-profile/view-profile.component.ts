import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';

import { MatSnackBar } from '@angular/material/snack-bar';

import { UserService } from 'src/app/core/services/user.service';
import { UserDetailed } from 'src/app/core/types/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit, OnDestroy {
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
    private location: Location,
    private router: Router,
  ) { };

  private paramsSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.paramsSubscription = this.activeRoute.params.subscribe((data) => {
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
          this.router.navigate(['/404'])
        }
      });

    });
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
}
