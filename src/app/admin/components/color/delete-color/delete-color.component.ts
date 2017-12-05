import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ColorService } from '../../../../../api/color.service';
import { Color } from '../../../../../models/color';

@Component({
  selector: 'app-delete-color',
  templateUrl: './delete-color.component.html',
  styleUrls: ['./delete-color.component.less']
})
export class DeleteColorComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteColorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {color: Color},
    private colorService: ColorService,
  ) { }

  delete() {
    this.colorService.delete({colorid: this.data.color._id},
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
