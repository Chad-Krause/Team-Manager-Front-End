import { AbstractControl, AsyncValidatorFn, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "../services/api.service";
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
/** Checks to see if an email is taken already */
export class UniqueAlterEgoValidator implements AsyncValidator {
  constructor(private api: ApiService) {}

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.api.checkEmail(ctrl.value).pipe(
      map(email => (email.data.exists ? { emailTaken: true} : null)),
      catchError(() => null)
    );
  }
}