import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginResult } from '../models/login-result';

@Component({
  selector: 'app-landing-page',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LoginPageComponent {


  message: string = '';
  loginForm: FormGroup = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required])
  });

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    if(this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/account-info');
    }
  }

  ngAfterViewInit(): void {
  }

  login() {
    let success: Observable<LoginResult> = this.auth.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value);

    success.subscribe(res => {
      if(!res.success) {
        this.message = `Login failed! ${res.errorMsg}`;
      }
    });
  }

}
