import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../../api/team.service';
import { Team } from '../../../../models/team';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DeleteTeamComponent } from './delete-team/delete-team.component';
import { UpdateTeamComponent } from './update-team/update-team.component';
import { AddTeamComponent } from './add-team/add-team.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.less']
})
export class TeamComponent implements OnInit {

  limit: number;
  offset: number;
  country: string;
  teams: Team[];
  dataLength: number;
  showLoading: boolean;

  constructor(
    private teamService: TeamService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.limit = 20;
    this.offset = 0;
    this.country = '';
    this.showLoading = false;
  }

  ngOnInit() {
    this.getTeams(this.offset, this.limit, this.country);
  }

  getTeams(offset, limit, country) {
    this.showLoading = true;
    this.teamService.getMulti(offset, limit, '', country,
    (data) => {
      if (data.result) {
        this.teams = data.data;
        this.dataLength = data.count;
        this.showLoading = false;
      } else {
        this.handleError(data);
      }
    }, this.handleError);
  }

  changePage(e) {
    const { pageIndex, pageSize } = e;
    this.offset = pageIndex * pageSize;
    this.limit = pageSize;
    this.getTeams(this.offset, this.limit, this.country);
  }

  changeCountry() {
    this.offset = 0;
    this.getTeams(this.offset, this.limit, this.country);
  }

  addTeam() {
    let dialogRef = this.dialog.open(AddTeamComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('球队已添加', '确定', {
          duration: 1500
        });
        this.getTeams(this.offset, this.limit, this.country);
      }
    });
  }

  updateTeam(team) {
    let dialogRef = this.dialog.open(UpdateTeamComponent, {
      width: '400px',
      data: { team }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('球队已更新', '确定', {
          duration: 1500
        });
        this.getTeams(this.offset, this.limit, this.country);
      }
    });
  }

  deleteTeam(team) {
    let dialogRef = this.dialog.open(DeleteTeamComponent, {
      width: '400px',
      data: { team }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('球队已删除', '确定', {
          duration: 1500
        });
        this.getTeams(this.offset, this.limit, this.country);
      }
    });
  }

  private handleError(err) {
    alert(`网络错误：${err.message}`);
    console.log(err);
  }

}
