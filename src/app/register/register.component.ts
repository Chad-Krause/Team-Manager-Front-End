import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { FormErrorStateMatcher } from '../directives/form-error-state-matcher';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  passwordConfirmMatcher = new FormErrorStateMatcher();

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'email': new FormControl('', [
        Validators.email,
        Validators.required
      ]),
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
    return pass == confirmPass ? null : { notSame: true }
  }

  asyncEmailValidator() {
    this.api.checkEmail('test').subscribe(
      valid => valid.data.exists
    )
  }

  submit() {
    console.log("Valid?: ", this.registerForm.valid);
  }
}

