import { Injectable, EventEmitter } from '@angular/core';
import { ApiService } from './api.service';
import { globals } from 'src/environments/globals';
import { User, Roles } from '../models/user';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { LoginResult } from '../models/login-result';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  loginChanged: EventEmitter<null> = new EventEmitter<null>();

  constructor(private api: ApiService, private router: Router) { }

  login(email: string, password: string): Observable<LoginResult> {
    return new Observable(res => {
      let loginResult: LoginResult = new LoginResult();

      this.api.login(email, password).subscribe(
        token => {
          if(token.success) {
            this.user = new User(token.data.user);
            localStorage.setItem(globals.LS_JWT, token.data.token);
            localStorage.setItem(globals.LS_USER, JSON.stringify(this.user));
            this.router.navigateByUrl('account-info');
            loginResult.success = true;
            res.next(loginResult);
            this.loginChanged.emit();
          } else {
            loginResult.success = false;
            loginResult.errorMsg = token.errors[0].title;
            res.next(loginResult);
            this.loginChanged.emit();
          }
        }
      );
    })
  }

  getUser(): User {
    return new User(JSON.parse(localStorage.getItem(globals.LS_USER)));
  }

  logout(): void {
    localStorage.removeItem(globals.LS_JWT);
    localStorage.removeItem(globals.LS_USER);
    this.loginChanged.emit();
  }

  getJWT(): string {
    return localStorage.getItem(globals.LS_JWT);
  }

  isLoggedIn(): boolean {
    const helper = new JwtHelperService();
    const encodedToken = this.getJWT();

    if(encodedToken == undefined) {
      return false;
    }

    const decodedToken = helper.decodeToken(encodedToken);

    const expiry = new Date(decodedToken.exp);
    const now = Date.now() / 1000;
    return expiry.getTime() > now;
  }

  getRole() {
    return this.getUser().role;
  }

  setUser(user: User) {
    localStorage.setItem(globals.LS_USER, JSON.stringify(user));
  }
}
