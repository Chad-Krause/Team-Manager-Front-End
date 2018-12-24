import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TidbitDialogData, Operations } from 'src/app/models/tidbit-dialog-data';
import { TidbitType } from 'src/app/models/tidbit-type';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tidbit-dialog',
  templateUrl: './tidbit-dialog.component.html',
  styleUrls: ['./tidbit-dialog.component.css']
})
export class TidbitDialogComponent implements OnInit {
  unusedTidbitTypes: TidbitType[] = [];
  addTidbitContainer: addTidbitTypeContainer = new addTidbitTypeContainer();
  message: string = '';

  constructor(
    public dialogRef: MatDialogRef<TidbitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TidbitDialogData,
    private api: ApiService
  ) { }

  ngOnInit() {
    console.log(this.data);
    if(this.data.operation == Operations.UPDATE) {
      this.addTidbitContainer.tidbitType = this.data.tidbitTypes.filter(tbt => this.data.tidbit.tidbittypeid == tbt.id)[0];
      this.generateForm(this.addTidbitContainer.tidbitType.id);
    } else if (this.data.operation == Operations.DESTROY) {
    }

    let unusedTidbitTypeIds = this.data.userTidbits.map(type => type.tidbittypeid);
    this.unusedTidbitTypes = this.data.tidbitTypes.filter(type => !unusedTidbitTypeIds.includes(type.id));
  }

  getTitle() {
    let title: string = '';
    switch (this.data.operation) {
      case Operations.CREATE:
        title = 'Add Tidbit';
        break;
      case Operations.DESTROY:
        title = 'Confirm Removal';
        break;
      case Operations.READ:
        break;
      case Operations.UPDATE:
        title = 'Edit Tidbit';
        break;
      default:
        title = 'Error - Operation not found';
    }
    return title;
  }

  generateForm(value) {
    this.addTidbitContainer = new addTidbitTypeContainer();
    this.addTidbitContainer.tidbitType = this.data.tidbitTypes.filter(tbt => tbt.id === value)[0];
    let type = this.addTidbitContainer.tidbitType.type.split('.');

    this.addTidbitContainer.type = type[0];

    if(type[0] == 'selection') {
      this.addTidbitContainer.options = JSON.parse(type[1]);
      this.addTidbitContainer.value = +this.addTidbitContainer.tidbitType.default_value;
    } else if(type[0] == 'multiselection') {
      this.addTidbitContainer.options = JSON.parse(type[1]);
      this.addTidbitContainer.value = +this.addTidbitContainer.tidbitType.default_value;
    } else {
      this.addTidbitContainer.value = '';
    }
    
    this.addTidbitContainer.ready = true;
  }

  confirm() {
    let submissionValue = '';
    if(this.data.operation == Operations.CREATE || this.data.operation == Operations.UPDATE) {
      if(this.addTidbitContainer.value == null || this.addTidbitContainer.value == undefined || this.addTidbitContainer.value == '') {
        this.message = 'Set a value. Changes not saved.';
        return;
      } else if (this.addTidbitContainer.type == 'selection') {
        submissionValue = this.addTidbitContainer.options[this.addTidbitContainer.value];
      } else if (this.addTidbitContainer.type == 'multiselection') {
        submissionValue = this.addTidbitContainer.options.filter((option, index) => this.addTidbitContainer.value.includes(index.toString())).join(', ');
      } else {
        submissionValue = this.addTidbitContainer.value;
      }
      if(this.data.operation == Operations.CREATE) {
        this.api.addTidbit(this.data.userid, this.addTidbitContainer.tidbitType.id, submissionValue).subscribe(res => this.dialogRef.close(res.success));
      } else {
        this.api.editTidbit(this.data.userid, this.addTidbitContainer.tidbitType.id, submissionValue).subscribe(res => this.dialogRef.close(res.success));
      }
    } else {
      this.api.deleteTidbit(this.data.userid, this.data.tidbit.tidbittypeid).subscribe(res => this.dialogRef.close(res.success));
    }
  }

  cancel() {
    this.dialogRef.close(false);
  }
}

class addTidbitTypeContainer {
  tidbitType: TidbitType = null;
  options: string[] = [];
  type: string = 'string';
  ready: boolean = false;
  value = null;
}
