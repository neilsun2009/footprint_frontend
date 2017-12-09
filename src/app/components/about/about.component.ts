import { Component, OnInit } from '@angular/core';
import { MasterConfigService } from '../../services/master-config.service';
import { MatchService } from '../../../api/match.service';
import { CommentService } from '../../../api/comment.service';
import { UserService } from '../../../api/user.service';
import { FieldService } from '../../../api/field.service';
import { LogService } from '../../../api/log.service';
import { Log } from '../../../models/log';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.less']
})
export class AboutComponent implements OnInit {

  runningTime: number;
  matchCount: number;
  userCount: number;
  forecastCount: number;
  chatCount: number;
  postmatchCount: number;
  fieldCount: number;
  primaryColor: string;
  logs: Log[];

  constructor(
    private masterConfigService: MasterConfigService,
    private matchService: MatchService,
    private commentService: CommentService,
    private userService: UserService,
    private fieldService: FieldService,
    private logService: LogService,
    private titleService: TitleService
  ) {
    this.primaryColor = '#000000';
  }

  ngOnInit() {
    this.masterConfigService.setConfig({
      primaryColor: this.primaryColor,
      secondaryColor: '#FFFFFF',
      showSidebar: false,
      showLoading: false
    });
    this.titleService.setTitle('关于');
    this.setRunningTime();
    this.getMatchCount();
    this.getChatCount();
    this.getForecastCount();
    this.getPostmatchCount();
    this.getUserCount();
    this.getFieldCount();
    this.getLogs();
  }

  private setRunningTime() {
    this.runningTime = +new Date() - +new Date(Date.UTC(2017, 5, 6, 14, 48, 0));
    setTimeout(() => {
      this.setRunningTime();
    }, 500);
  }

  private getUserCount() {
    this.userService.getCount(
    (data) => {
      if (data.result) {
          this.userCount = data.count;
      } else {
        this.handleError(data);
      }
    }, (err) => {
      this.handleError(err);
    });
  }

  private getFieldCount() {
    this.fieldService.getCount('',
    (data) => {
      if (data.result) {
          this.fieldCount = data.count;
      } else {
        this.handleError(data);
      }
    }, (err) => {
      this.handleError(err);
    });
  }

  private getMatchCount() {
    this.matchService.getCount('', '', '', false, false,
    (data) => {
      if (data.result) {
          this.matchCount = data.count;
      } else {
        this.handleError(data);
      }
    }, (err) => {
      this.handleError(err);
    });
  }

  private getChatCount() {
    this.commentService.getCount('', 'chat', '',
    (data) => {
      if (data.result) {
          this.chatCount = data.count;
      } else {
        this.handleError(data);
      }
    }, (err) => {
      this.handleError(err);
    });
  }

  private getForecastCount() {
    this.commentService.getCount('', 'forecast', '',
    (data) => {
      if (data.result) {
          this.forecastCount = data.count;
      } else {
        this.handleError(data);
      }
    }, (err) => {
      this.handleError(err);
    });
  }

  private getPostmatchCount() {
    this.commentService.getCount('', 'postmatch', '',
    (data) => {
      if (data.result) {
          this.postmatchCount = data.count;
      } else {
        this.handleError(data);
      }
    }, (err) => {
      this.handleError(err);
    });
  }

  private getLogs() {
    this.logService.getMulti(0, 0,
    (data) => {
      if (data.result) {
          this.logs = data.data;
      } else {
        this.handleError(data);
      }
    }, (err) => {
      this.handleError(err);
    });
  }

  private handleError(err) {
    alert(`网络错误：${err.message}`);
    console.log(err);
  }
}
