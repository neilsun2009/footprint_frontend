import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSelectChange } from '@angular/material';
import { MatchService } from '../../../../../api/match.service';
import { Match } from '../../../../../models/match';
import { Team } from '../../../../../models/team';
import { Color } from '../../../../../models/color';
import { QiniuService } from '../../../../../api/qiniu.service';

@Component({
  selector: 'app-update-match',
  templateUrl: './update-match.component.html',
  styleUrls: ['./update-match.component.less']
})
export class UpdateMatchComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UpdateMatchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {match: Match, teams: Team[], colors: Color[]},
    private matchService: MatchService,
    private qiniuService: QiniuService
  ) {}

  ngOnInit() {
    this.qiniuService.upload(window['Qiniu'], 'uploadBtn1', 'uploadCtn1', 'uploadCtn1', 'footprint/team/',
    (up, file, info) => {
      let res = JSON.parse(info.response);
      this.data.match.teams[0].logo = `${this.qiniuService.domainUrl}${res.key}`;
    }, (up, err, errTip) => {
      alert('err');
      console.log(errTip);
    });
    this.qiniuService.upload(window['Qiniu'], 'uploadBtn2', 'uploadCtn2', 'uploadCtn2', 'footprint/team/',
    (up, file, info) => {
      let res = JSON.parse(info.response);
      this.data.match.teams[1].logo = `${this.qiniuService.domainUrl}${res.key}`;
    }, (up, err, errTip) => {
      alert('err');
      console.log(errTip);
    });
  }

  update() {
    this.matchService.update({
      matchid: this.data.match._id,
      teams: this.data.match.teams,
      stadium: this.data.match.stadium,
      weather: this.data.match.weather,
      startTime: this.data.match.startTime,
      competition: this.data.match.competition,
      round: this.data.match.round,
      colors: this.data.match.colors,
      colors2: this.data.match.colors2,
      sofaScoreId: this.data.match.sofaScoreId,
      referee: this.data.match.referee
    },
    (data) => {
      if (data.result) {
        this.dialogRef.close(data);
      } else {
        this.handleError(data);
      }
    }, this.handleError);
  }

  selectTeam(isAway: number, event: MatSelectChange) {
    let team = this.data.teams[+event.value];
    this.data.match.teams[isAway] = {
      teamid: team._id,
      teamName: team.teamName,
      logo: team.logo,
      score: this.data.match.teams[isAway].score
    };
  }

  selectColor(isAway: boolean, event: MatSelectChange) {
    let color = this.data.colors[+event.value];
    if (isAway) {
      this.data.match.colors2 = [color.colors[0], color.colors[1]];
    } else {
      this.data.match.colors = [color.colors[0], color.colors[1]];
    }
  }

  private handleError(err) {
    alert(`网络错误：${err.message}`);
    console.log(err);
  }

}
