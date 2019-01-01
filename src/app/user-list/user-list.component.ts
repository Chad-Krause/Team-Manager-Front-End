import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { User } from '../models/user';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  allUsers: User[] = [];
  filteredUsers: User[] = [];
  unconfirmedUsers: User[] = [];
  query: FormControl = new FormControl('');
  

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.query.valueChanges.subscribe(change => this.filter());
    this.refreshUsers();
  }

  filter() {
    let sc = this.query.value.toLowerCase();
    this.filteredUsers = [];
    this.filteredUsers = this.allUsers.filter(user => {
      return (user.firstName.toLowerCase().includes(sc) ||
      user.lastName.toLowerCase().includes(sc) ||
      user.email.toLowerCase().includes(sc) ||
      (user.nickname != undefined ? user.nickname.toLowerCase().includes(sc) : false ));
    })

    console.log('refreshing filtered');
    console.log(this.filteredUsers);
  }

  refreshUsers() {
    console.log('refreshing users');
    this.api.getAllUsers().subscribe(response => {
      this.allUsers = [];
      response.data.forEach(user => this.allUsers.push(new User(user)));
      this.filter();
      this.confirmDenyUsersSetup();
    });
  }

  confirmDenyUsersSetup() {
    this.unconfirmedUsers = [];
    this.unconfirmedUsers = this.allUsers.filter(user => !user.confirmed);
    console.log('refreshing unconfirmed');
    console.log(this.unconfirmedUsers);
  }
}
