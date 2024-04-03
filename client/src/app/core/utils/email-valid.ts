import { ValidatorFn, AbstractControl } from '@angular/forms';

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let email = control.value;
    if (!email) {
      return null;
    }
    const regex = new RegExp(
      `^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$`,
    );
    const valid = regex.test(email);

    return valid ? null : { emailValid: true };
  };
}
