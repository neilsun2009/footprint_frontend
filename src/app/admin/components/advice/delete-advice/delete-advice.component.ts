import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdviceService } from '../../../../../api/advice.service';
import { Advice } from '../../../../../models/advice';

@Component({
  selector: 'app-delete-advice',
  templateUrl: './delete-advice.component.html',
  styleUrls: ['./delete-advice.component.less']
})
export class DeleteAdviceComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteAdviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {advice: Advice},
    private adviceService: AdviceService,
  ) { }

  delete() {
    this.adviceService.delete({adviceid: this.data.advice._id},
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
