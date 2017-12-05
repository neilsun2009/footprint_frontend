import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { WallpaperService } from '../../../../../api/wallpaper.service';
import { Wallpaper } from '../../../../../models/wallpaper';
import { QiniuService } from '../../../../../api/qiniu.service';

@Component({
  selector: 'app-add-wallpaper',
  templateUrl: './add-wallpaper.component.html',
  styleUrls: ['./add-wallpaper.component.less']
})
export class AddWallpaperComponent implements OnInit {

  addParam: {
    wallpaperName: string;
    image: string;
  };

  constructor(
    public dialogRef: MatDialogRef<AddWallpaperComponent>,
    private wallpaperService: WallpaperService,
    private qiniuService: QiniuService
  ) {
    let date = new Date();
    this.addParam = {
      wallpaperName: '',
      image: ''
    };
  }

  ngOnInit() {
    this.qiniuService.upload(window['Qiniu'], 'uploadBtn', 'uploadCtn', 'uploadCtn', 'footprint/wallpaper/',
    (up, file, info) => {
      let res = JSON.parse(info.response);
      this.addParam.image = `${this.qiniuService.domainUrl}${res.key}`;
    }, (up, err, errTip) => {
      alert('err');
      console.log(errTip);
    });
  }

  add() {
    this.wallpaperService.add(this.addParam,
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
