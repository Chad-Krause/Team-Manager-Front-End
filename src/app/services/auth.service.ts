import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { globals } from 'src/environments/globals';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(private api: ApiService, private router: Router) { }

  login(email: string, password: string) {
    this.api.login(email, password).subscribe(
      token => {
        if(token.success) {
          this.user = new User(token.data.user);
          localStorage.setItem(globals.LS_JWT, token.data.token);
          localStorage.setItem(globals.LS_USER, JSON.stringify(this.user));
          this.router.navigateByUrl('account-info');
        }
      }
    );
  }

  getUser(): User {
    return new User(JSON.parse(localStorage.getItem(globals.LS_USER)));
  }

  logout(): void {
    localStorage.removeItem(globals.LS_JWT);
    localStorage.removeItem(globals.LS_USER);
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
}
