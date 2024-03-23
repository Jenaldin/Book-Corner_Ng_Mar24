import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable({ providedIn: 'root' })
export class AuthActive implements CanActivate {
   constructor(private userApi: UserService) { }

   canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
   ):
      | boolean
      | UrlTree
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree> {
      return this.userApi.isLoggedIn;
   }
};

