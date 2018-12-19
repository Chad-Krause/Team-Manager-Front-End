import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-account-details',
  templateUrl: './edit-account-details.component.html',
  styleUrls: ['./edit-account-details.component.css']
})
export class EditAccountDetailsComponent implements OnInit {

  user: User = null;
  editForm: FormGroup;
  thisYear: number = new Date().getFullYear();

  constructor(
    private api: ApiService,
    private auth: AuthService
  ) {
    // Get initial Values
    this.user = this.auth.getUser();
   }

  ngOnInit() {
    this.editForm = new FormGroup({
      'email': new FormControl(this.user.email),
      'first': new FormControl(this.user.firstName),
      'last': new FormControl(this.user.lastName),
      'birthday': new FormControl(this.user.birthday),
      'graduation': new FormControl(this.user.graduationYear, {validators: Validators.min(this.thisYear)}),
      'yearJoined': new FormControl(this.user.yearJoined),
      'nickname': new FormControl(this.user.nickname, Validators.maxLength(30))
    });

    this.editForm.controls.email.disable();
    this.editForm.controls.first.disable();
    this.editForm.controls.last.disable();

    if(this.user.graduationYear != null) {
      this.editForm.controls.graduation.disable();
    }

    if(this.user.yearJoined != null) {
      this.editForm.controls.yearJoined.disable();
    }
  }

  
}
