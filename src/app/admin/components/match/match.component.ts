import { Component, OnInit } from '@angular/core';
import { MatchService } from '../../../../api/match.service';
import { Match } from '../../../../models/match';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { DeleteMatchComponent } from './delete-match/delete-match.component';
import { Sort } from '@angular/material';
import { TeamService } from '../../../../api/team.service';
import { Team } from '../../../../models/team';
import { UpdateMatchComponent } from './update-match/update-match.component';
import { AddMatchComponent } from './add-match/add-match.component';
import { ColorService } from '../../../../api/color.service';
import { Color } from '../../../../models/color';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.less']
})
export class MatchComponent implements OnInit {

  limit: number;
  offset: number;
  displayedColumns: string[];
  matches: MatTableDataSource<Match>;
  dataLength: number;
  showLoading: boolean;
  keyWord: string;
  sort: string;
  teams: Team[];
  colors: Color[];

  constructor(
    private matchService: MatchService,
    private teamService: TeamService,
    private colorService: ColorService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.limit = 20;
    this.offset = 0;
    this.showLoading = false;
    this.keyWord = '';
    this.sort = 'desc';
  }

  ngOnInit() {
    this.getTeams();
    this.getColors();
    this.displayedColumns = ['time', 'teams', 'competition', 'colors', 'operations'];
    this.getMatches(this.offset, this.limit, this.keyWord, this.sort);
  }

  getMatches(offset, limit, keyWord, sort) {
    this.showLoading = true;
    this.matchService.getMulti(offset, limit, keyWord, '', '', sort, false, false,
    (data) => {
      if (data.result) {
        this.matches = new MatTableDataSource(data.data);
        this.dataLength = data.count;
        this.showLoading = false;
      } else {
        this.handleError(data);
      }
    }, this.handleError);
  }

  getTeams() {
    this.teamService.getMulti(0, 0, '', '',
    (data) => {
      if (data.result) {
        this.teams = data.data;
      } else {
        this.handleError(data);
      }
    }, this.handleError);
  }

  getColors() {
    this.colorService.getMulti(0, 0, '', '',
    (data) => {
      if (data.result) {
        this.colors = data.data;
      } else {
        this.handleError(data);
      }
    }, this.handleError);
  }

  changePage(e) {
    const { pageIndex, pageSize } = e;
    this.offset = pageIndex * pageSize;
    this.limit = pageSize;
    this.getMatches(this.offset, this.limit, this.keyWord, this.sort);
  }

  changeKeyword() {
    this.getMatches(this.offset, this.limit, this.keyWord, this.sort);
  }

  sortData(sort: Sort) {
    this.sort = this.sort === 'asc' ? 'desc' : 'asc';
    this.getMatches(this.offset, this.limit, this.keyWord, this.sort);
  }

  addMatch() {
    let dialogRef = this.dialog.open(AddMatchComponent, {
      width: '750px',
      height: '600px',
      data: { teams: this.teams, colors: this.colors }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('比赛已添加', '确定', {
          duration: 1500
        });
        this.getMatches(this.offset, this.limit, this.keyWord, this.sort);
      }
    });
  }

  updateMatch(match) {
    let dialogRef = this.dialog.open(UpdateMatchComponent, {
      width: '750px',
      height: '600px',
      data: { match, teams: this.teams, colors: this.colors }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('比赛已更新', '确定', {
          duration: 1500
        });
        this.getMatches(this.offset, this.limit, this.keyWord, this.sort);
      }
    });
  }

  deleteMatch(match) {
    let dialogRef = this.dialog.open(DeleteMatchComponent, {
      width: '400px',
      data: { match }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('比赛已删除', '确定', {
          duration: 1500
        });
        this.getMatches(this.offset, this.limit, this.keyWord, this.sort);
      }
    });
  }

  private handleError(err) {
    alert(`网络错误：${err.message}`);
    console.log(err);
  }

}
