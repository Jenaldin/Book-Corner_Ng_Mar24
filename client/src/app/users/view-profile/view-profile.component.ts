import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from 'src/app/core/services/user.service';
import { UserDetailed } from 'src/app/core/types/user';
import { Subscription } from 'rxjs';
import { ErrorHandlerService } from 'src/app/core/services/error.service';

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
    private activeRoute: ActivatedRoute,
    private location: Location,
    private errorHandlerService: ErrorHandlerService,
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
          this.errorHandlerService.handleError(
            error,
            'An error occurred while fetching the user. Please try again.',
          );
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
