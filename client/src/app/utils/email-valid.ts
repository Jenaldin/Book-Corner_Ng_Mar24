import { ValidatorFn } from '@angular/forms';

export function emailValid(): ValidatorFn {
   const regExp = new RegExp(`^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$`);
   return (control) => {
     const isInvalid = control.value === '' || regExp.test(control.value);
     return isInvalid ? null : { emailValid: true };
   };
 }