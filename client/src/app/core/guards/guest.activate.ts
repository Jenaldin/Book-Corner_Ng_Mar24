import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';

import { MatSnackBar } from '@angular/material/snack-bar';

export function guestActive(): CanActivateFn{
  return () => {
    const userApi = inject(UserService);
    const router = inject(Router);
    const snackBar = inject(MatSnackBar);

    if (userApi.isLoggedIn) {
            snackBar.open(
              `You are already logged in, you can't use this path now. First logout.`,
              'Close',
              { duration: 10000 },
            );
            return router.createUrlTree(['/']);
          }
          return true;
  }
}

// @Injectable({ providedIn: 'root' })
// export class GuestActive implements CanActivate {
//   constructor(
//     private userApi: UserService,
//     private snackBar: MatSnackBar,
//     private router: Router
//   ) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot,
//   ):
//     | boolean
//     | UrlTree
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree> {
//     if (this.userApi.isLoggedIn) {
//       this.snackBar.open(
//         `You are already logged in, you can't use this path now. First logout.`,
//         'Close',
//         { duration: 10000 },
//       );
//       return this.router.createUrlTree(['/']);
//     }
//     return true;
//   }
// }
