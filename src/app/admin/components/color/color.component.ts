import { Component, OnInit } from '@angular/core';
import { ColorService } from '../../../../api/color.service';
import { Color } from '../../../../models/color';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DeleteColorComponent } from './delete-color/delete-color.component';
import { UpdateColorComponent } from './update-color/update-color.component';
import { AddColorComponent } from './add-color/add-color.component';
import { TeamService } from '../../../../api/team.service';
import { Team } from '../../../../models/team';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.less']
})
export class ColorComponent implements OnInit {

  limit: number;
  offset: number;
  colorName: string;
  colors: Color[];
  teams: Team[];
  dataLength: number;
  showLoading: boolean;

  constructor(
    private colorService: ColorService,
    private teamService: TeamService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.limit = 20;
    this.offset = 0;
    this.colorName = '';
    this.showLoading = false;
  }

  ngOnInit() {
    this.getTeams();
    this.getColors(this.offset, this.limit, this.colorName);
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

  getColors(offset, limit, colorName) {
    this.showLoading = true;
    this.colorService.getMulti(offset, limit, colorName, '',
    (data) => {
      if (data.result) {
        this.colors = data.data;
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
    this.getColors(this.offset, this.limit, this.colorName);
  }

  search() {
    this.offset = 0;
    this.getColors(this.offset, this.limit, this.colorName);
  }

  addColor() {
    let dialogRef = this.dialog.open(AddColorComponent, {
      width: '400px',
      data: { teams: this.teams }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('色彩已添加', '确定', {
          duration: 1500
        });
        this.getColors(this.offset, this.limit, this.colorName);
      }
    });
  }

  updateColor(color) {
    let dialogRef = this.dialog.open(UpdateColorComponent, {
      width: '400px',
      data: { color, teams: this.teams }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('色彩已更新', '确定', {
          duration: 1500
        });
        this.getColors(this.offset, this.limit, this.colorName);
      }
    });
  }

  deleteColor(color) {
    let dialogRef = this.dialog.open(DeleteColorComponent, {
      width: '400px',
      data: { color }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('色彩已删除', '确定', {
          duration: 1500
        });
        this.getColors(this.offset, this.limit, this.colorName);
      }
    });
  }

  private handleError(err) {
    alert(`网络错误：${err.message}`);
    console.log(err);
  }

}
