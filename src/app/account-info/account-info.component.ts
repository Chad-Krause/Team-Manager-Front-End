import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { formatDate } from '@angular/common';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { Tidbit } from '../models/tidbit';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  user: User;
  hours: string;
  id: number;
  details: { key: string, value }[];
  tidbits: Tidbit[] = [];
  self: boolean = true;

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    let id = this.route.snapshot.params.id;
    this.self = false;

    if (id === undefined) {
      id = this.auth.getUser().id;
      this.self = true;
    }

    this.id = id;

    this.api.getUser(id).subscribe(
      response => {
        this.user = new User(response.data.user);
        this.tidbits = response.data.tidbits;
        this.hours = response.data.totalHoursLogged.totalTimeLogged;
        this.getDetails();
      });
  }

  ngOnInit() {

  }

  getDetails() {
    let u = this.user;
    this.details = [
      { key: 'Name', value: `${u.firstName} ${u.lastName}` },
      { key: 'Nickname', value: u.nickname },
      { key: 'Email', value: u.email },
      { key: 'Account Type', value: u.getRole() },
      { key: 'Birthday', value: u.birthday ? formatDate(u.birthday, 'longDate', 'en', 'utc') : '' },
      { key: 'Year Joined', value: u.yearJoined },
      { key: 'Graduation Year', value: u.graduationYear },
      { key: 'Total Time Logged', value: this.formatHoursLoggedTime(this.hours) }
    ]
  }

  formatHoursLoggedTime(hoursLogged: string) {
    if (hoursLogged == undefined) { // Not correct format
      return '';
    }
    let timeArray = hoursLogged.split(':');
    let hour, minute;

    if (+timeArray[0] == 1) {
      hour = `1 hour`;
    } else if (+timeArray[0] > 1) {
      hour = `${+timeArray[0]} hours`;
    } else {
      hour = '0 hours';
    }

    if (+timeArray[1] == 1) {
      minute = `1 minute`;
    } else if (+timeArray[1] > 1) {
      minute = `${+timeArray[1]} minutes`;
    } else {
      minute = '0 minutes';
    }

    return `${hour}, ${minute}`;
  }

  edit() {
    if(this.self) {
      this.router.navigateByUrl('/edit-account-info');
    } else {
      this.router.navigateByUrl(`edit-account-info/${this.id}`);
    }
  }

}
