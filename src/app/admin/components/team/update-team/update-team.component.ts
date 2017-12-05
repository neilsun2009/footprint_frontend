import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TeamService } from '../../../../../api/team.service';
import { Team } from '../../../../../models/team';
import { QiniuService } from '../../../../../api/qiniu.service';

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrls: ['./update-team.component.less']
})
export class UpdateTeamComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<UpdateTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {team: Team},
    private teamService: TeamService,
    private qiniuService: QiniuService
  ) {}

  ngOnInit() {
    this.qiniuService.upload(window['Qiniu'], 'uploadBtn', 'uploadCtn', 'uploadCtn', 'footprint/team/',
    (up, file, info) => {
      let res = JSON.parse(info.response);
      this.data.team.logo = `${this.qiniuService.domainUrl}${res.key}`;
    }, (up, err, errTip) => {
      alert('err');
      console.log(errTip);
    });
  }

  update() {
    this.teamService.update({
      teamid: this.data.team._id,
      teamName: this.data.team.teamName,
      engTeamName: this.data.team.engTeamName,
      logo: this.data.team.logo,
      country: this.data.team.country
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
