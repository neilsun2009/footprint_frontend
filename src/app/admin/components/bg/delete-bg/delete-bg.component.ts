import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BgService } from '../../../../../api/bg.service';
import { Bg } from '../../../../../models/bg';

@Component({
  selector: 'app-delete-bg',
  templateUrl: './delete-bg.component.html',
  styleUrls: ['./delete-bg.component.less']
})
export class DeleteBgComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteBgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {bg: Bg},
    private bgService: BgService,
  ) { }

  delete() {
    this.bgService.delete({bgid: this.data.bg._id},
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
