import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TeamService } from '../../../../../api/team.service';
import { Team } from '../../../../../models/team';

@Component({
  selector: 'app-delete-team',
  templateUrl: './delete-team.component.html',
  styleUrls: ['./delete-team.component.less']
})
export class DeleteTeamComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {team: Team},
    private teamService: TeamService,
  ) { }

  delete() {
    this.teamService.delete({teamid: this.data.team._id},
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
