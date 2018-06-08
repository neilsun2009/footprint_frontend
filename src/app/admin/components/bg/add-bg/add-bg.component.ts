import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { BgService } from '../../../../../api/bg.service';
import { Bg } from '../../../../../models/bg';
import { QiniuService } from '../../../../../api/qiniu.service';

@Component({
  selector: 'app-add-bg',
  templateUrl: './add-bg.component.html',
  styleUrls: ['./add-bg.component.less']
})
export class AddBgComponent implements OnInit {

  addParam: {
    name: string;
    image: string;
  };

  constructor(
    public dialogRef: MatDialogRef<AddBgComponent>,
    private bgService: BgService,
    private qiniuService: QiniuService
  ) {
    let date = new Date();
    this.addParam = {
      name: '',
      image: ''
    };
  }

  ngOnInit() {
    this.qiniuService.upload(window['Qiniu'], 'uploadBtn', 'uploadCtn', 'uploadCtn', 'footprint/bg-website/',
    (up, file, info) => {
      let res = JSON.parse(info.response);
      this.addParam.image = `${this.qiniuService.domainUrl}${res.key}`;
    }, (up, err, errTip) => {
      alert('err');
      console.log(errTip);
    });
  }

  add() {
    this.bgService.add(this.addParam,
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
