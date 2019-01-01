import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'user-list-item',
  inputs: ['user: User', ''],
  outputs: ['refresh'],
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.css']
})
export class UserListItemComponent implements OnInit {
  @Input() user: User;
  @Input() type: UserListItemType;
  @Output() refresh = new EventEmitter<any>();

  constructor(
    private api: ApiService,
    private router: Router
  ) { 
  }

  ngOnInit() {
  }

  confirmUser() {
    this.api.confirmUser(this.user.id).subscribe(response => {
      if(response.success) {
        this.refresh.emit();
      }
    });
  }

  disableUser() {
    this.api.disableUser(this.user.id).subscribe(response => {
      if(response.success) {
        this.refresh.emit();
      }
    });
  }

  accountDetails() {
    this.router.navigateByUrl(`/account-info/${this.user.id}`)
  }

  editUser() {
    this.router.navigateByUrl(`/edit-account-info/${this.user.id}`)
  }
  
}

export enum UserListItemType {
  COMFIRM_DELETE = 1,
  NORMAL = 2
}
