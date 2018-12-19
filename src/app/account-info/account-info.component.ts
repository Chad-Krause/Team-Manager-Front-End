import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { formatDate } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  user: User;
  hours: string;

  constructor(
    private auth: AuthService,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.user = this.auth.getUser();
    this.api.getTotalHoursLogged(this.user.id, null).subscribe(
      res => this.hours = this.formatHoursLoggedTime(res.data.totalTimeLogged)
    );
  }

  getDetails() {
    let u = this.user;
    return [
      {key: 'Name', value: `${u.firstName} ${u.lastName}`},
      {key: 'Nickname', value: u.nickname},
      {key: 'Email', value: u.email},
      {key: 'Account Type', value: u.getRole()},
      {key: 'Birthday', value: formatDate(u.birthday, 'longDate', 'en', 'utc')},
      {key: 'Year Joined', value: u.yearJoined},
      {key: 'Graduation Year', value: u.graduationYear},
      {key: 'Total Time Logged', value: this.hours}
    ]
  }

  formatHoursLoggedTime(hoursLogged: string) {
    if(hoursLogged == undefined) { // Not correct format
      return '';
    }
    let timeArray = hoursLogged.split(':');
    let hour, minute;

    if(+timeArray[0] == 1) {
      hour = `1 hour`;
    } else if (+timeArray[0] > 1) {
      hour = `${+timeArray[0]} hours`;
    } else {
      hour = '0 hours';
    }

    if(+timeArray[1] == 1) {
      minute = `1 minute`;
    } else if (+timeArray[1] > 1) {
      minute = `${+timeArray[1]} minutes`;
    } else {
      minute = '0 minutes';
    }

    return `${hour}, ${minute}`;
  }

}
