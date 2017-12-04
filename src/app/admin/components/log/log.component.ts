import { Component, OnInit } from '@angular/core';
import { LogService } from '../../../../api/log.service';
import { Log } from '../../../../models/log';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { DeleteLogComponent } from './delete-log/delete-log.component';
import { UpdateLogComponent } from './update-log/update-log.component';
import { AddLogComponent } from './add-log/add-log.component';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.less']
})
export class LogComponent implements OnInit {

  limit: number;
  offset: number;
  displayedColumns: string[];
  logs: MatTableDataSource<Log>;
  dataLength: number;
  showLoading: boolean;

  constructor(
    private logService: LogService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.limit = 20;
    this.offset = 0;
    this.showLoading = false;
  }

  ngOnInit() {
    this.displayedColumns = ['date', 'events', 'operations'];
    this.getLogs(this.offset, this.limit);
  }

  getLogs(offset, limit) {
    this.showLoading = true;
    this.logService.getMulti(offset, limit,
    (data) => {
      if (data.result) {
        this.logs = new MatTableDataSource(data.data);
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
    this.getLogs(this.offset, this.limit);
  }

  addLog() {
    let dialogRef = this.dialog.open(AddLogComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Log已添加', '确定', {
          duration: 1500
        });
        this.getLogs(this.offset, this.limit);
      }
    });
  }

  updateLog(log) {
    let dialogRef = this.dialog.open(UpdateLogComponent, {
      width: '400px',
      data: { log }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Log已更新', '确定', {
          duration: 1500
        });
        this.getLogs(this.offset, this.limit);
      }
    });
  }

  deleteLog(log) {
    let dialogRef = this.dialog.open(DeleteLogComponent, {
      width: '400px',
      data: { log }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Log已删除', '确定', {
          duration: 1500
        });
        this.getLogs(this.offset, this.limit);
      }
    });
  }

  private handleError(err) {
    alert(`网络错误：${err.message}`);
    console.log(err);
  }

}
