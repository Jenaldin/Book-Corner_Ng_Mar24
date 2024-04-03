import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';

import { UserService } from 'src/app/core/services/user.service';
import { NavigationSnackComponent } from '../../shared/navigation/navigation-snack.component';

@Injectable({ providedIn: 'root' })
export class AuthActive implements CanActivate {
  constructor(
    private userApi: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (!this.userApi.isLoggedIn) {
      this.snackBar.openFromComponent(NavigationSnackComponent, {
        duration: 10000,
      });
      return this.router.createUrlTree(['/users/login']);
    }
    return true;
  }
}
