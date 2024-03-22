// import { ValidatorFn } from '@angular/forms';

// export function emailValid(): ValidatorFn {
//    const regExp = new RegExp(`^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`);
//    return (control) => {
//      const isInvalid = control.value === '' || regExp.test(control.value);
//      return isInvalid ? null : { emailValid: true };
//    };
//  }

import { ValidatorFn, AbstractControl } from '@angular/forms';

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let email = control.value;
    if (!email) {
      // if control is empty return null
      return null;
    }

    // Regular expression for email validation
    const regex = new RegExp(`^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$`);
    const valid = regex.test(email);
    // return null if email is valid, otherwise return an object with validation error
    return valid ? null : { 'emailValid': true };
  };
}