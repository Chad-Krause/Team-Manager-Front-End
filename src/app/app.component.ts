import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Roles } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Waverly Robotics';
  opened: boolean = false;
  links: Link[];

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.generateLinks();
    this.auth.loginChanged.subscribe(res => this.generateLinks());
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
    this.generateLinks();
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  generateLinks() {

    console.log('generating links');

    if (this.auth.isLoggedIn()) {
      if (this.auth.getRole() == Roles.ADMIN) {
        this.links = [
          { name: 'Account Details', url: '/account-info', icon: 'person', disabled: false },
          { name: 'User List', url: '/user-list', icon: 'people', disabled: false },
          { name: 'Tidbits', url: null, icon: 'assignment', disabled: true }
        ];
      } else if (this.auth.getRole() == Roles.MENTOR || this.auth.getRole() == Roles.STUDENT) {
        this.links = [
          { name: 'Account Details', url: '/account-details', icon: 'person' }
        ];
      }
    } else {
      this.links = [];
    }

  }

  navigate(url: string) {
    if (url) {
      this.router.navigateByUrl(url);
    }
    this.opened = false;
  }
}

class Link {
  name: string;
  url: string;
  icon: string;
  disabled?: boolean;
}
