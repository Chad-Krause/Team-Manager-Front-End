import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  user: User;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.user = this.auth.getUser();
    console.log(this.auth.getUser());
  }

}
