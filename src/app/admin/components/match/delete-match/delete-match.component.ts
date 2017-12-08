import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatchService } from '../../../../../api/match.service';
import { Match } from '../../../../../models/match';

@Component({
  selector: 'app-delete-match',
  templateUrl: './delete-match.component.html',
  styleUrls: ['./delete-match.component.less']
})
export class DeleteMatchComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteMatchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {match: Match},
    private matchService: MatchService,
  ) { }

  delete() {
    this.matchService.delete({matchid: this.data.match._id},
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
