import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';

/*@Directive({
  selector: '[appPasswordMatch]'
})*/

export function PasswordMatchValidator(password: AbstractControl): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const match: boolean = password.value == control.value;
    return match ? { 'PasswordMismatch': { value: control.value } } : null
  };
}

