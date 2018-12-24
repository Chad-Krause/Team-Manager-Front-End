import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, AccountDetails } from '../models/api';
import { EmailCheck } from '../models/email-check';
import { HttpClient, HttpParams, HttpRequest, HttpResponse, HttpEvent } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRegistration, UserRegistrationResponse, UserLoginResponse, HoursLogged, User } from '../models/user';
import { globals } from 'src/environments/globals';
import { Tidbit } from '../models/tidbit';
import { TidbitType } from '../models/tidbit-type';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  checkEmail(email: string): Observable<ApiResponse<EmailCheck>> {
    return this.http.get<ApiResponse<EmailCheck>>(environment.baseUrl + 'user/checkEmail', { params: { email } });
  }

  registerUser(user: UserRegistration): Observable<ApiResponse<UserRegistrationResponse>> {
    return this.http.post<ApiResponse<UserRegistrationResponse>>(environment.baseUrl + 'user/createUser', user);
  }

  resetPasswordWithValidator(password: string, confirmPassword: string, validator: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(environment.baseUrl + 'user/resetPasswordWithValidator', { password, confirmPassword, validator });
  }

  requestPasswordReset(email: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(environment.baseUrl + 'user/resetPassword', { email });
  }

  login(email: string, password: string): Observable<ApiResponse<UserLoginResponse>> {
    return this.http.post<ApiResponse<UserLoginResponse>>(environment.baseUrl + 'user/login', { email, password });
  }

  getTotalHoursLogged(userid: number, date: Date = null): Observable<ApiResponse<any>> {
    let params = {};
    if (date != null) {
      params = params = { userid: userid.toString(), date: date.toISOString().substr(0, 10) };
    } else {
      params = { userid: userid.toString() };
    }

    return this.http.get<ApiResponse<HoursLogged>>(environment.baseUrl + 'punch/hoursLogged', { params: params });
  }

  getUser(userid: number): Observable<ApiResponse<AccountDetails>> {
    return this.http.get<ApiResponse<AccountDetails>>(environment.baseUrl + 'user/get', { params: { id: userid.toString() } });
  }

  saveUser(id: number, params?): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(environment.baseUrl + 'user/updateUser', Object.assign({ id: id }, params));
  }

  getTidbitTypes(): Observable<ApiResponse<TidbitType[]>> {
    return this.http.get<ApiResponse<TidbitType[]>>(environment.baseUrl + 'tidbits/getAllTidbitTypes');
  }

  addTidbit(userid: number, tidbittypeid: number, value: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(environment.baseUrl + 'tidbits/addTidbit', { userid, tidbittypeid, value });
  }

  editTidbit(userid: number, tidbittypeid: number, value: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(environment.baseUrl + 'tidbits/editTidbit', { userid, tidbittypeid, value });
  }

  deleteTidbit(userid: number, tidbittypeid: number): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(environment.baseUrl + 'tidbits/deleteTidbit', { userid, tidbittypeid });
  }

  uploadFile(file: File): Observable<HttpEvent<ApiResponse<any>>> {
    const formData: FormData = new FormData();
    formData.append('upload', file, file.name);

    const request = new HttpRequest(
      "POST", environment.baseUrl + 'image/upload', formData,
      { reportProgress: true });
    return this.http.request(request);
  }
}
