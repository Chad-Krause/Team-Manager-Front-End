import { AbstractControl, AsyncValidatorFn, AsyncValidator, ValidationErrors, NG_ASYNC_VALIDATORS } from "@angular/forms";
import { Injectable, Directive, forwardRef } from "@angular/core";
import { ApiService } from "../services/api.service";
import { catchError, map, debounceTime, switchMap } from 'rxjs/operators';
import { Observable, of, timer } from "rxjs";

@Injectable({ providedIn: 'root' })
/** Checks to see if an email is taken already */
export class AsyncEmailValidator implements AsyncValidator {
  constructor(private api: ApiService) { }

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return timer(500).pipe(
      switchMap(() => {
        return this.api.checkEmail(ctrl.value).pipe(
          map(result => (result.data.exists ? { emailTaken: true } : null)),
          catchError(() => null)
        );
      })
    )
  }
}

@Directive({
  selector: '[asyncEmailValidator]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => AsyncEmailValidator),
      multi: true
    }
  ]
})
export class AsyncEmailValidatorDirective {
  constructor(private validator: AsyncEmailValidator) { }

  validate(control: AbstractControl) {
    this.validator.validate(control);
  }
}