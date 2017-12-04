import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LogService } from '../../../../../api/log.service';
import { Log } from '../../../../../models/log';

@Component({
  selector: 'app-update-log',
  templateUrl: './update-log.component.html',
  styleUrls: ['./update-log.component.less']
})
export class UpdateLogComponent {

  events: string;

  constructor(
    public dialogRef: MatDialogRef<UpdateLogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {log: Log},
    private logService: LogService,
  ) {
    this.events = data.log.events.join('|');
  }

  update() {
    this.data.log.date = new Date(this.data.log.date);
    this.data.log.date.setUTCHours(0);
    this.logService.update({
      logid: this.data.log._id,
      date: this.data.log.date,
      events: this.events.split('|')
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
