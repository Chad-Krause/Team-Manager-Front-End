import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  request_sent: boolean = false;
  message: string = '';
  successfulRequest: boolean = false;
  email: FormControl = new FormControl('', [
    Validators.email,
    Validators.required
  ]);

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  resetPassword(): void {
    this.request_sent = true;
    this.api.requestPasswordReset(this.email.value).subscribe(
      response => {
        this.successfulRequest = response.success;
        if (!response.success) {
          this.message = response.errors[0].title;
          this.request_sent = false;
        } 
      }
    )
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'Email is required' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
}
