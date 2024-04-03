import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

import { MatSnackBar } from '@angular/material/snack-bar';

export function guestActive(): CanActivateFn {
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
  };
}
