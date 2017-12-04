import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WallpaperService } from '../../../../../api/wallpaper.service';
import { Wallpaper } from '../../../../../models/wallpaper';

@Component({
  selector: 'app-delete-wallpaper',
  templateUrl: './delete-wallpaper.component.html',
  styleUrls: ['./delete-wallpaper.component.less']
})
export class DeleteWallpaperComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteWallpaperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {wallpaper: Wallpaper},
    private wallpaperService: WallpaperService,
  ) { }

  delete() {
    this.wallpaperService.delete({wallpaperid: this.data.wallpaper._id},
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
