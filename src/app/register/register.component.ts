import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { FormErrorStateMatcher } from '../directives/form-error-state-matcher';
import { ApiService } from '../services/api.service';
import { AsyncEmailValidator } from '../directives/async-email-validator.directive';
import { UserRegistration } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  message: string = 'You should only register if you are a member of the Waverly Robotics Team';
  passwordConfirmMatcher = new FormErrorStateMatcher();
  successfulRegistration: boolean = false;
  success: string = 'Registration successful. Please wait until an admin confirms you.'

  constructor(
    private api: ApiService,
    private asyncEmailValidator: AsyncEmailValidator
  ) {
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'email': new FormControl('', {
        validators: [
          Validators.email,
          Validators.required
        ], asyncValidators: this.asyncEmailValidator.validate.bind(this.asyncEmailValidator)
      }),
      'first': new FormControl('', [
        Validators.required
      ]),
      'last': new FormControl('', [
        Validators.required
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      'passwordConfirm': new FormControl('', [
        Validators.required
      ])
    }, { validators: this.passwordMatchValidator });
  }


  passwordMatchValidator(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.passwordConfirm.value;
    return pass == confirmPass ? null : { mismatch: true }
  }

  submit() {
    if (!this.registerForm.valid) {
      return;
    }

    this.api.registerUser(new UserRegistration(this.registerForm.value)).subscribe(
      response => {
        this.message = response.success ? this.success : response.errors[0].title;
        this.successfulRegistration = response.success;
      }
    )
  }
}

