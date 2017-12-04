import { Component, OnInit } from '@angular/core';
import { AdviceService } from '../../../../api/advice.service';
import { Advice } from '../../../../models/advice';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { DeleteAdviceComponent } from './delete-advice/delete-advice.component';

@Component({
  selector: 'app-advice',
  templateUrl: './advice.component.html',
  styleUrls: ['./advice.component.less']
})
export class AdviceComponent implements OnInit {

  displayedColumns: string[];
  advices: MatTableDataSource<Advice>;
  showLoading: boolean;

  constructor(
    private adviceService: AdviceService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.showLoading = false;
  }

  ngOnInit() {
    this.displayedColumns = ['date', 'content', 'operations'];
    this.getAdvices();
  }

  getAdvices() {
    this.showLoading = true;
    this.adviceService.getMulti({},
    (data) => {
      if (data.result) {
        this.advices = new MatTableDataSource(data.data);
        this.showLoading = false;
      } else {
        this.handleError(data);
      }
    }, this.handleError);
  }


  deleteAdvice(advice) {
    let dialogRef = this.dialog.open(DeleteAdviceComponent, {
      width: '400px',
      data: { advice }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('投稿已删除', '确定', {
          duration: 1500
        });
        this.getAdvices();
      }
    });
  }

  private handleError(err) {
    alert(`网络错误：${err.message}`);
    console.log(err);
  }

}
