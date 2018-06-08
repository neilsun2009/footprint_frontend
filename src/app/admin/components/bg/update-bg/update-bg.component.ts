import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BgService } from '../../../../../api/bg.service';
import { Bg } from '../../../../../models/bg';
import { QiniuService } from '../../../../../api/qiniu.service';

@Component({
  selector: 'app-update-bg',
  templateUrl: './update-bg.component.html',
  styleUrls: ['./update-bg.component.less']
})
export class UpdateBgComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<UpdateBgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {bg: Bg},
    private bgService: BgService,
    private qiniuService: QiniuService
  ) {}

  ngOnInit() {
    this.qiniuService.upload(window['Qiniu'], 'uploadBtn', 'uploadCtn', 'uploadCtn', 'footprint/bg-website/',
    (up, file, info) => {
      let res = JSON.parse(info.response);
      this.data.bg.image = `${this.qiniuService.domainUrl}${res.key}`;
    }, (up, err, errTip) => {
      alert('err');
      console.log(errTip);
    });
  }

  update() {
    this.bgService.update({
      bgid: this.data.bg._id,
      name: this.data.bg.name,
      image: this.data.bg.image,
      inUse: this.data.bg.inUse
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
