import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LoginPageComponent {

  loginForm: FormGroup = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required])
  });

  constructor(
    private auth: AuthService
  ) {
  }

  ngAfterViewInit(): void {
  }

  login() {
    this.auth.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value);
  }

}
