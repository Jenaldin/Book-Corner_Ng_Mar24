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
   USER_KEY = '[auth]';
   userSubscription: Subscription;

   constructor(private http: HttpClient) {
      const storedUser = sessionStorage.getItem(this.USER_KEY);
      if (storedUser) {
         this.user$$.next(JSON.parse(storedUser));
      }

      this.userSubscription = this.user$.subscribe((user) => {
         this.user = user;
      });
   };

   get isLoggedIn(): boolean {
      return !!this.user;
   };

   register(firstName: string, lastName: string, username: string, email: string,
      password: string, rePassword: string, avatar: string
   ) {
      const { apiUrl } = environment;
      return this.http.post<User>(`${apiUrl}/register`, {
         firstName, lastName, username, email, password, rePassword, avatar,
      })
         .pipe(tap((user) => {
            this.user$$.next(user);
            sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
         }))
   };

   login(username: string, password: string) {
      const { apiUrl } = environment;
      return this.http.post<User>(`${apiUrl}/login`, { username, password })
         .pipe(tap((user) => {
            this.user$$.next(user);
            sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
         }))
   }

   logout() {
      const { apiUrl } = environment;
      return this.http.post(`${apiUrl}/logout`, {}).pipe(tap(() => {
         this.user$$.next(undefined);
         sessionStorage.removeItem(this.USER_KEY);
      }));
   };

   getProfile() {

   };

   editProfile() {

   };

   ngOnDestroy(): void {
      this.userSubscription.unsubscribe();
   };
}