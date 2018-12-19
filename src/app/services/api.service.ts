import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api';
import { EmailCheck } from '../models/email-check';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRegistration, UserRegistrationResponse, UserLoginResponse, HoursLogged, User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  checkEmail(email: string): Observable<ApiResponse<EmailCheck>> {
    return this.http.get<ApiResponse<EmailCheck>>(environment.baseUrl + 'user/checkEmail', { params: {email}});
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

  login(email: string, password: string) : Observable<ApiResponse<UserLoginResponse>> {
    return this.http.post<ApiResponse<UserLoginResponse>>(environment.baseUrl + 'user/login', {email, password});
  }

  getTotalHoursLogged(userid: number, date: Date = null) : Observable<ApiResponse<any>> {
    let params = {};
    if(date != null){
      params = params = {userid: userid.toString(), date: date.toISOString().substr(0,10)};
    } else {
      params = {userid: userid.toString()};
    }

    return this.http.get<ApiResponse<HoursLogged>>(environment.baseUrl + 'punch/hoursLogged', { params: params });
  }

  getUser(id: number): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(environment.baseUrl + 'user/get', {params: {id: id.toString()}});
  }
}
