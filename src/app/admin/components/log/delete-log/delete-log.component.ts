import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LogService } from '../../../../../api/log.service';
import { Log } from '../../../../../models/log';

@Component({
  selector: 'app-delete-log',
  templateUrl: './delete-log.component.html',
  styleUrls: ['./delete-log.component.less']
})
export class DeleteLogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteLogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {log: Log},
    private logService: LogService,
  ) { }

  delete() {
    this.logService.delete({logid: this.data.log._id},
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
