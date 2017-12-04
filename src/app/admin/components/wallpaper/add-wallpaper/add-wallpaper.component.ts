import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { WallpaperService } from '../../../../../api/wallpaper.service';
import { Wallpaper } from '../../../../../models/wallpaper';

@Component({
  selector: 'app-add-wallpaper',
  templateUrl: './add-wallpaper.component.html',
  styleUrls: ['./add-wallpaper.component.less']
})
export class AddWallpaperComponent {

  addParam: {
    wallpaperName: string;
    image: string;
  };

  constructor(
    public dialogRef: MatDialogRef<AddWallpaperComponent>,
    private wallpaperService: WallpaperService,
  ) {
    let date = new Date();
    this.addParam = {
      wallpaperName: '',
      image: ''
    };
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
