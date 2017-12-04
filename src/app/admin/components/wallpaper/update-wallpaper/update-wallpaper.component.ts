import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WallpaperService } from '../../../../../api/wallpaper.service';
import { Wallpaper } from '../../../../../models/wallpaper';
@Component({
  selector: 'app-update-wallpaper',
  templateUrl: './update-wallpaper.component.html',
  styleUrls: ['./update-wallpaper.component.less']
})
export class UpdateWallpaperComponent {


  constructor(
    public dialogRef: MatDialogRef<UpdateWallpaperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {wallpaper: Wallpaper},
    private wallpaperService: WallpaperService,
  ) {}

  update() {
    this.wallpaperService.update({
      wallpaperid: this.data.wallpaper._id,
      wallpaperName: this.data.wallpaper.wallpaperName,
      image: this.data.wallpaper.image
    },
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
