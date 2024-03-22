import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../types/user';

@Injectable({
   providedIn: 'root'
})

export class UserService implements OnDestroy {
   private user$$ = new BehaviorSubject<User | undefined>(undefined);
   private user$ = this.user$$.asObservable();

   user: User | undefined;
   userSubscription: Subscription;

   constructor(private http: HttpClient) {
      this.userSubscription = this.user$.subscribe((user) => {
         this.user = user;
      });
   }

   isLoggedIn(): boolean {
      return !!this.user;
   }

   register(firstName: string, lastName: string, username: string, email: string,
      password: string, rePassword: string, avatar: string
   ) {
      const { apiUrl } = environment;
      
      return this.http.post<User>(`${apiUrl}/register`, {
         firstName, lastName, username, email,
         password, rePassword, avatar,
      }).pipe(tap((user) => this.user$$.next(user)))
   }

   logout() {
      // this.user = undefined;
      // localStorage.removeItem(this.USER_KEY);
   }

   ngOnDestroy(): void {
      this.userSubscription.unsubscribe();
   }
}