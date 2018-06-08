import { Component, OnInit } from '@angular/core';
import { BgService } from '../../../../api/bg.service';
import { Bg } from '../../../../models/bg';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DeleteBgComponent } from './delete-bg/delete-bg.component';
import { UpdateBgComponent } from './update-bg/update-bg.component';
import { AddBgComponent } from './add-bg/add-bg.component';

@Component({
  selector: 'app-bg',
  templateUrl: './bg.component.html',
  styleUrls: ['./bg.component.less']
})
export class BgComponent implements OnInit {

  limit: number;
  offset: number;
  bgs: Bg[];
  dataLength: number;
  showLoading: boolean;

  constructor(
    private bgService: BgService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.limit = 0;
    this.offset = 0;
    this.showLoading = false;
  }

  ngOnInit() {
    this.getBgs(this.offset, this.limit);
  }

  getBgs(offset, limit) {
    this.showLoading = true;
    this.bgService.getMulti(offset, limit, false,
    (data) => {
      if (data.result) {
        this.bgs = data.data;
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
    this.getBgs(this.offset, this.limit);
  }

  addBg() {
    let dialogRef = this.dialog.open(AddBgComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Bg已添加', '确定', {
          duration: 1500
        });
        this.getBgs(this.offset, this.limit);
      }
    });
  }

  updateBg(bg) {
    let dialogRef = this.dialog.open(UpdateBgComponent, {
      width: '400px',
      data: { bg }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('壁纸已更新', '确定', {
          duration: 1500
        });
        this.getBgs(this.offset, this.limit);
      }
    });
  }

  changeUse(bg) {
    this.bgService.update({
      bgid: bg._id,
      inUse: !bg.inUse
    },
    (data) => {
      if (data.result) {
        this.snackBar.open('壁纸已更新', '确定', {
          duration: 1500
        });
        bg.inUse = !bg.inUse;
      } else {
        this.handleError(data);
      }
    }, this.handleError);
  }

  deleteBg(bg) {
    let dialogRef = this.dialog.open(DeleteBgComponent, {
      width: '400px',
      data: { bg }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('壁纸已删除', '确定', {
          duration: 1500
        });
        this.getBgs(this.offset, this.limit);
      }
    });
  }

  private handleError(err) {
    alert(`网络错误：${err.message}`);
    console.log(err);
  }

}
