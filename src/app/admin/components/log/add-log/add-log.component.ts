import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LogService } from '../../../../../api/log.service';
import { Log } from '../../../../../models/log';

@Component({
  selector: 'app-add-log',
  templateUrl: './add-log.component.html',
  styleUrls: ['./add-log.component.less']
})
export class AddLogComponent {

  addParam: {
    date: Date,
    events: string
  };

  constructor(
    public dialogRef: MatDialogRef<AddLogComponent>,
    private logService: LogService,
  ) {
    let date = new Date();
    this.addParam = {
      date: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
      events: '',
    };
  }

  add() {
    this.addParam.date.setUTCHours(0);
    this.logService.add({
      date: this.addParam.date,
      events: this.addParam.events.split('|')
    },
    (data) => {
      if (data.result) {
        this.dialogRef.close(data);
      } else {
        this.handleError(data);
      }
    }, this.handleError);
  }

  private handleError(err) {
    alert(`网络错误：${err.message}`);
    console.log(err);
  }

}
