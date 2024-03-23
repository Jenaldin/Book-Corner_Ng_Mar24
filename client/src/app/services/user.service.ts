import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User, UserAuth } from '../types/user';

@Injectable({
   providedIn: 'root'
})

export class UserService implements OnDestroy {
   private user$$ = new BehaviorSubject<UserAuth | undefined>(undefined);
   private user$ = this.user$$.asObservable();

   user: UserAuth | undefined;
   KEY = '[auth]';
   userSubscription: Subscription;

   constructor(private http: HttpClient) {
      const storedUser = sessionStorage.getItem(this.KEY);
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
      return this.http.post<UserAuth>(`${apiUrl}/register`, {
         firstName, lastName, username, email, password, rePassword, avatar,
      }, {withCredentials: true})
         .pipe(tap((user) => {
            console.log("User after tap from Register: " + user);
            
            this.user$$.next(user);
            sessionStorage.setItem(this.KEY, JSON.stringify(user));
            console.log("Key in session storage Reg: " + this.KEY);
            console.log("User in session storage Reg: " + JSON.stringify(user));
            
            
         }))
   };

   login(username: string, password: string) {
      const { apiUrl } = environment;
      return this.http.post<UserAuth>(`${apiUrl}/login`, { username, password }, {withCredentials: true})
         .pipe(tap((user) => {
            console.log("User after tap from Login: " + user);
            this.user$$.next(user);
            sessionStorage.setItem(this.KEY, JSON.stringify(user));
            console.log("Key in session storage Log: " + this.KEY);
            console.log("User in session storage Log: " + JSON.stringify(user));
         }))
   };

   logout() {
      const { apiUrl } = environment;
      return this.http.post(`${apiUrl}/logout`, {}, {withCredentials: true}).pipe(tap(() => {
         this.user$$.next(undefined);
         sessionStorage.removeItem(this.KEY);
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