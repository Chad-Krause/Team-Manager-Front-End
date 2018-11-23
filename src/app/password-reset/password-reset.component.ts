import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { FormErrorStateMatcher } from '../directives/form-error-state-matcher';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  validator: string = '';
  message: string = '';
  passwordForm: FormGroup = new FormGroup({
    'password': new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    'passwordConfirm': new FormControl('', [
      Validators.required
    ])
  }, { validators: this.passwordMatchValidator });
  passwordConfirmMatcher = new FormErrorStateMatcher();

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.validator = params['v'];
    });
  }

  ngOnInit() {
  }

  passwordMatchValidator(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.passwordConfirm.value;
    return pass == confirmPass ? null : { mismatch: true }
  }

  submit() {
    console.log(this.passwordForm.errors);

    if(!this.passwordForm.valid) {
      return;
    }

    this.api.resetPasswordWithValidator(this.passwordForm.controls.password.value, this.passwordForm.controls.confirmPassword.value, this.validator).subscribe(
      response => {
        if(!response.success) {
          this.message = response.errors[0].title;
        } else {
          this.router.navigateByUrl('login');
        }
      },
    );
  }

}
