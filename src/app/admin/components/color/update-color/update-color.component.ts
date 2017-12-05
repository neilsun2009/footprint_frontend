import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ColorService } from '../../../../../api/color.service';
import { Color } from '../../../../../models/color';
import { Team } from '../../../../../models/team';

@Component({
  selector: 'app-update-color',
  templateUrl: './update-color.component.html',
  styleUrls: ['./update-color.component.less']
})
export class UpdateColorComponent {

  constructor(
    public dialogRef: MatDialogRef<UpdateColorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {color: Color, teams: Team[]},
    private colorService: ColorService,
  ) {}

  update() {
    this.colorService.update({
      colorid: this.data.color._id,
      colorName: this.data.color.colorName,
      colors: this.data.color.colors,
      teamid: this.data.color.teamid
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
