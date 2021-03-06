import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {

      let loggedInUser = this.auth.getUser();

      if(!this.auth.isLoggedIn()) {
        console.error('This page is unavailable. Please log in first!');
        this.router.navigate(['login'])
      }

      return this.auth.isLoggedIn();
  }
}
