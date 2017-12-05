import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ColorService } from '../../../../../api/color.service';
import { Color } from '../../../../../models/color';
import { Team } from '../../../../../models/team';

@Component({
  selector: 'app-add-color',
  templateUrl: './add-color.component.html',
  styleUrls: ['./add-color.component.less']
})
export class AddColorComponent {

  addParam: {
    colorName: string;
    colors: string[];
    teamid: string;
  };

  constructor(
    public dialogRef: MatDialogRef<AddColorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {teams: Team[]},
    private colorService: ColorService
  ) {
    let date = new Date();
    this.addParam = {
      colorName: '',
      colors: ['', ''],
      teamid: ''
    };
  }

  add() {
    this.colorService.add(this.addParam,
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
