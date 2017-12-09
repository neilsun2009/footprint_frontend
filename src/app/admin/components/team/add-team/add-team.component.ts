import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { TeamService } from '../../../../../api/team.service';
import { Team } from '../../../../../models/team';
import { QiniuService } from '../../../../../api/qiniu.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.less']
})
export class AddTeamComponent implements OnInit {

  addParam: {
    teamName: string;
    logo: string;
    country: string;
    engTeamName: string;
  };

  constructor(
    public dialogRef: MatDialogRef<AddTeamComponent>,
    private teamService: TeamService,
    private qiniuService: QiniuService
  ) {
    let date = new Date();
    this.addParam = {
      teamName: '',
      engTeamName: '',
      logo: '',
      country: ''
    };
  }

  ngOnInit() {
    this.qiniuService.upload(window['Qiniu'], 'uploadBtn', 'uploadCtn', 'uploadCtn', 'footprint/team/',
    (up, file, info) => {
      let res = JSON.parse(info.response);
      this.addParam.logo = `${this.qiniuService.domainUrl}${res.key}`;
    }, (up, err, errTip) => {
      alert('err');
      console.log(errTip);
    });
  }

  add() {
    this.teamService.add(this.addParam,
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
