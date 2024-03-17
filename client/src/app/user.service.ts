import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root'
})

export class AuthUserService {
   // Below is just a placeholder, to work later on it with staging user etc.
   isLoggedIn(): boolean {
      return false;
      // real code should be >>> return !!this.user;
   }
}