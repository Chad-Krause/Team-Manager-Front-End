import { Component, OnInit, ViewChild } from '@angular/core';
import { User, ACCOUNT_ROLES } from '../models/user';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { AccountDetails } from '../models/api';
import { TidbitType } from '../models/tidbit-type';
import { Tidbit } from '../models/tidbit';
import { MatDialog } from '@angular/material';
import { TidbitDialogComponent } from '../modals/tidbit-dialog/tidbit-dialog.component';
import { TidbitDialogData, Operations } from '../models/tidbit-dialog-data';
import { Subject } from 'rxjs';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-edit-account-details',
  templateUrl: './edit-account-details.component.html',
  styleUrls: ['./edit-account-details.component.css']
})
export class EditAccountDetailsComponent implements OnInit {

  user: User = null;
  editForm: FormGroup;
  thisYear: number = new Date().getFullYear();
  message: string = '';
  account_roles = ACCOUNT_ROLES;
  tidbits: Tidbit[] = [];
  tidbitTypes: TidbitType[] = [];
  tidbitMsg: string = '';
  tidbitsAvailable: boolean = false;
  setupFinished: boolean = false;
  progress: number = 100;
  imgMessage: string = '';
  imgUrl: string = '/assets/missing_profile.png';
  imgId: number = 0;

  @ViewChild('file') file;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public tidbitDialog: MatDialog
  ) {
    let id = this.route.snapshot.params.id;
    if (id === undefined) {
      id = this.auth.getUser().id;
    }

    this.api.getUser(id).subscribe(
      response => {
        this.user = new User(response.data.user);
        this.tidbits = response.data.tidbits;
        this.createForm();
        this.getTidbitInformation();
        this.imgUrl = this.user.getProfilePicture();
      }
    );


  }

  ngOnInit() {
  }

  createForm() {
    this.editForm = new FormGroup({
      'email': new FormControl(this.user.email),
      'first': new FormControl(this.user.firstName),
      'last': new FormControl(this.user.lastName),
      'birthday': new FormControl(this.user.birthday),
      'graduationYear': new FormControl(this.user.graduationYear, { validators: Validators.min(this.thisYear) }),
      'yearJoined': new FormControl(this.user.yearJoined),
      'nickname': new FormControl(this.user.nickname, Validators.maxLength(30)),
      'roleid': new FormControl(this.user.role),
      'pin': new FormControl('', {validators: [Validators.minLength(4), Validators.maxLength(4), Validators.pattern(/\d*/)]})
    });

    this.editForm.controls.email.disable();
    this.editForm.controls.first.disable();
    this.editForm.controls.last.disable();
    this.editForm.controls.roleid.disable();


    if (this.user.graduationYear != null) {
      this.editForm.controls.graduationYear.disable();
    }

    if (this.user.yearJoined != null) {
      this.editForm.controls.yearJoined.disable();
    }

    if (this.user.birthday != null) {
      this.editForm.controls.birthday.disable();
    }

    if (this.auth.getUser().role == 1) {
      this.editForm.enable();
    }
  }

  save() {

    if(this.editForm.invalid) {
      this.message = 'One of the fields is invalid. Please fix before submitting';
      return;
    }

    let params: any = {};

    Object.keys(this.editForm.controls).forEach(key => {
      if (this.editForm.get(key).enabled) {
        params[key] = this.editForm.get(key).value;
      }
    });

    if(this.imgId) {
      params.profileimageid = this.imgId;
    }

    this.api.saveUser(this.user.id, params).subscribe(
      result => {
        if (result.success) {
          this.router.navigate(['account-info']);
        } else {
          this.message = "Failed to update. This could happen if no information changed.";
        }
      }
    );
  }

  editTidbit(tidbittypeid: number) {
    let dialogData = new TidbitDialogData;
    dialogData.operation = Operations.UPDATE;
    dialogData.tidbitTypes = this.tidbitTypes;
    dialogData.userTidbits = this.tidbits;
    dialogData.tidbit = this.tidbits.filter(tidbit => tidbit.tidbittypeid = tidbittypeid)[0];
    dialogData.userid = this.user.id;

    const dialogRef = this.tidbitDialog.open(TidbitDialogComponent, {
      width: '300px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result) {
        this.getTidbitInformation();
        this.refreshTidbits();
      }
    });
  }

  deleteTidbit(tidbittypeid: number) {
    let dialogData = new TidbitDialogData;
    dialogData.operation = Operations.DESTROY;
    dialogData.tidbitTypes = this.tidbitTypes;
    dialogData.userTidbits = this.tidbits;
    dialogData.tidbit = this.tidbits.filter(tidbit => tidbit.tidbittypeid = tidbittypeid)[0];
    dialogData.userid = this.user.id;

    const dialogRef = this.tidbitDialog.open(TidbitDialogComponent, {
      width: '300px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result) {
        this.getTidbitInformation();
        this.refreshTidbits();
      }
    });
  }

  addTidbit() {
    let dialogData = new TidbitDialogData;
    dialogData.operation = Operations.CREATE;
    dialogData.tidbitTypes = this.tidbitTypes;
    dialogData.userTidbits = this.tidbits;
    dialogData.userid = this.user.id;

    const dialogRef = this.tidbitDialog.open(TidbitDialogComponent, {
      width: '300px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result) {
        this.getTidbitInformation();
        this.refreshTidbits();
      }
    });
  }

  refreshTidbits() {
    this.api.getUser(this.user.id).subscribe(
      res => {
        this.tidbits = res.data.tidbits;
        this.tidbitMsg = this.getTidbitMsg();
      }
    )
  }

  getTidbitInformation() {
    this.api.getTidbitTypes().subscribe(
      response => {
        this.tidbitTypes = response.data;
        this.tidbitMsg = this.getTidbitMsg();
      }
    );
  }

  getTidbitMsg() {
    this.setupFinished = true;
    if(this.tidbitTypes.length > this.tidbits.length) {
      this.tidbitsAvailable = true;
      if(this.tidbitTypes.length - this.tidbits.length == 1) {
        return "There's a new tidbit available!";
      } else {
        return `There are ${this.tidbitTypes.length - this.tidbits.length} new tidbits!`;
      }
    } else {
      this.tidbitsAvailable = false;
      return 'There are no new tidbits';
    }
  }

  uploadImageButton() {
    this.file.nativeElement.click();
  }

  onFileSelect(files: FileList) {
    let file = files.item(0);

    if(file.size > 5000000) {
      this.file.nativeElement.value = '';
      this.imgMessage = 'Image too big. Keep it under 5MB';
      return;
    }

    this.api.uploadFile(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = (event.loaded / event.total) * 100;
        } else if (event.type === HttpEventType.Response) {
          this.imgUrl = event.body.data.url;
          this.imgId = event.body.data.id;
        }
      }
      
    );
  }

}
