import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api';
import { EmailCheck } from '../models/email-check';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRegistration, UserRegistrationResponse } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  checkEmail(email: string): Observable<ApiResponse<EmailCheck>> {
    return this.http.get<ApiResponse<EmailCheck>>(environment.baseUrl + 'user/checkEmail', { params: {email: email}});
  }

  registerUser(user: UserRegistration): Observable<ApiResponse<UserRegistrationResponse>> {
    return this.http.post<ApiResponse<UserRegistrationResponse>>(environment.baseUrl + 'user/createUser', user);
  }

  resetPasswordWithValidator(password: string, confirmPassword: string, validator: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(environment.baseUrl + 'user/resetPasswordWithValidator', {password, confirmPassword, validator});
  }

  requestPasswordReset(email: string) : Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(environment.baseUrl + 'user/resetPassword', {email});
  }
}
