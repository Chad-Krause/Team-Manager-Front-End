import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../models/api';
import { EmailCheck } from '../models/email-check';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  checkEmail(email: string): Observable<API<EmailCheck>> {
    return this.http.get<API<EmailCheck>>(environment.baseUrl + 'user/checkEmail', { params: {email: email}});
  }
}
