import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';

export function UniqueUsername(userApi: UserService): AsyncValidatorFn {
   return (control: AbstractControl): 
      Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
         return userApi
            .checkUsername(control.value)
            .pipe(map(isTaken => (isTaken ? { 'usernameTaken': true } : null)));
   };
}