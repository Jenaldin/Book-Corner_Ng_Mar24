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
import { BookService } from '../services/book.service';

@Injectable({ providedIn: 'root' })
export class OwnerActive implements CanActivate {
  constructor(
    private userApi: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private bookApi: BookService,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      if (this.userApi.isLoggedIn) {
        const itemId = next.paramMap.get('bookId');

        if (itemId === null) {
          this.router.navigate(['/404']);
          observer.next(false);
          observer.complete();
        } else {
         this.bookApi.getBook(itemId).subscribe((item) => {
            if (item.owner._id === this.userApi.currentUserId) {
              observer.next(true);
            } else {
              this.snackBar.open(
                `You are not the one who created this item, so you are not authorized to edit it`,
                'Close',
                { duration: 10000 },
              );
              this.router.navigate(['/catalog']);
              observer.next(false);
            }
            observer.complete();
          });
        }
      } else {
        this.snackBar.openFromComponent(NavigationSnackComponent, {
          duration: 10000,
        });
        this.router.navigate(['/users/login']);
        observer.next(false);
        observer.complete();
      }
    });
  }
}
