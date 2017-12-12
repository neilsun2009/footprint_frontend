import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSelectChange } from '@angular/material';
import { MatchService } from '../../../../../api/match.service';
import { Match } from '../../../../../models/match';
import { QiniuService } from '../../../../../api/qiniu.service';
import { Team } from '../../../../../models/team';
import { Color } from '../../../../../models/color';

@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.less']
})
export class AddMatchComponent implements OnInit {

  addParam: {
    teams: {
      teamid: string,
      teamName: string,
      score: number,
      logo: string
    }[];
    stadium: string;
    weather: string;
    startTime: string;
    competition: string;
    round: string;
    colors: string[];
    colors2: string[];
    sofaScoreId: string;
    referee: string;
  };

  constructor(
    public dialogRef: MatDialogRef<AddMatchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {match: Match, teams: Team[], colors: Color[]},
    private matchService: MatchService,
    private qiniuService: QiniuService
  ) {
    let date = new Date();
    this.addParam = {
      teams: [{
        teamid: '',
        teamName: '',
        score: -1,
        logo: '',
      }, {
        teamid: '',
        teamName: '',
        score: -1,
        logo: '',
      }],
      stadium: '',
      weather: '晴',
      startTime: `${date.getUTCFullYear()}-${this.datePadding(date.getUTCMonth() + 1)}-${this.datePadding(date.getUTCDate())}T`
        + `${this.datePadding(date.getUTCHours())}:${this.datePadding(date.getUTCMinutes())}:00.000Z`,
      competition: '2018中超联赛',
      round: '第轮',
      colors: ['', ''],
      colors2: ['', ''],
      sofaScoreId: '',
      referee: '',
    };
  }

  datePadding(ori) {
    if (ori < 10) {
      return '0' + ori;
    }
    return ori;
  }

  ngOnInit() {
    this.qiniuService.upload(window['Qiniu'], 'uploadBtn1', 'uploadCtn1', 'uploadCtn1', 'footprint/team/',
    (up, file, info) => {
      let res = JSON.parse(info.response);
      this.addParam.teams[0].logo = `${this.qiniuService.domainUrl}${res.key}`;
    }, (up, err, errTip) => {
      alert('err');
      console.log(errTip);
    });
    this.qiniuService.upload(window['Qiniu'], 'uploadBtn2', 'uploadCtn2', 'uploadCtn2', 'footprint/team/',
    (up, file, info) => {
      let res = JSON.parse(info.response);
      this.addParam.teams[1].logo = `${this.qiniuService.domainUrl}${res.key}`;
    }, (up, err, errTip) => {
      alert('err');
      console.log(errTip);
    });
  }

  add() {
    this.matchService.add(this.addParam,
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
    this.addParam.teams[isAway] = {
      teamid: team._id,
      teamName: team.teamName,
      logo: team.logo,
      score: this.addParam.teams[isAway].score
    };
  }

  selectColor(isAway: boolean, event: MatSelectChange) {
    let color = this.data.colors[+event.value];
    if (isAway) {
      this.addParam.colors2 = [color.colors[0], color.colors[1]];
    } else {
      this.addParam.colors = [color.colors[0], color.colors[1]];
    }
  }

  private handleError(err) {
    alert(`网络错误：${err.message}`);
    console.log(err);
  }

}
