import { Component, OnInit } from '@angular/core';
import { WallpaperService } from '../../../../api/wallpaper.service';
import { Wallpaper } from '../../../../models/wallpaper';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DeleteWallpaperComponent } from './delete-wallpaper/delete-wallpaper.component';
import { UpdateWallpaperComponent } from './update-wallpaper/update-wallpaper.component';
import { AddWallpaperComponent } from './add-wallpaper/add-wallpaper.component';

@Component({
  selector: 'app-wallpaper',
  templateUrl: './wallpaper.component.html',
  styleUrls: ['./wallpaper.component.less']
})
export class WallpaperComponent implements OnInit {

  limit: number;
  offset: number;
  wallpapers: Wallpaper[];
  dataLength: number;
  showLoading: boolean;

  constructor(
    private wallpaperService: WallpaperService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.limit = 10;
    this.offset = 0;
    this.showLoading = false;
  }

  ngOnInit() {
    this.getWallpapers(this.offset, this.limit);
  }

  getWallpapers(offset, limit) {
    this.showLoading = true;
    this.wallpaperService.getMulti(offset, limit, '',
    (data) => {
      if (data.result) {
        this.wallpapers = data.data;
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
    this.getWallpapers(this.offset, this.limit);
  }

  addWallpaper() {
    let dialogRef = this.dialog.open(AddWallpaperComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Wallpaper已添加', '确定', {
          duration: 1500
        });
        this.getWallpapers(this.offset, this.limit);
      }
    });
  }

  updateWallpaper(wallpaper) {
    let dialogRef = this.dialog.open(UpdateWallpaperComponent, {
      width: '400px',
      data: { wallpaper }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('壁纸已更新', '确定', {
          duration: 1500
        });
        this.getWallpapers(this.offset, this.limit);
      }
    });
  }

  deleteWallpaper(wallpaper) {
    let dialogRef = this.dialog.open(DeleteWallpaperComponent, {
      width: '400px',
      data: { wallpaper }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('壁纸已删除', '确定', {
          duration: 1500
        });
        this.getWallpapers(this.offset, this.limit);
      }
    });
  }

  private handleError(err) {
    alert(`网络错误：${err.message}`);
    console.log(err);
  }

}
