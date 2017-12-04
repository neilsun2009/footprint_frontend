import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../api/user.service';
import { User } from '../../../../models/user';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { DeleteUserComponent } from './delete-user/delete-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {

  limit: number;
  offset: number;
  displayedColumns: string[];
  users: MatTableDataSource<User>;
  dataLength: number;
  showLoading: boolean;
  access: string;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.limit = 20;
    this.offset = 0;
    this.showLoading = false;
    this.access = 'user';
  }

  ngOnInit() {
    this.displayedColumns = ['username', 'access', 'number', 'colors', 'teams', 'operations'];
    this.getUsers(this.offset, this.limit, this.access);
  }

  getUsers(offset, limit, access) {
    this.showLoading = true;
    this.userService.getMulti(offset, limit, access,
    (data) => {
      if (data.result) {
        this.users = new MatTableDataSource(data.data);
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
    this.getUsers(this.offset, this.limit, this.access);
  }

  changeAccess() {
    this.access = this.access === 'deleted' ? 'user' : 'deleted';
    this.getUsers(this.offset, this.limit, this.access);
  }


  deleteUser(user) {
    let dialogRef = this.dialog.open(DeleteUserComponent, {
      width: '400px',
      data: { user }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('用户已删除', '确定', {
          duration: 1500
        });
        this.getUsers(this.offset, this.limit, this.access);
      }
    });
  }

  private handleError(err) {
    alert(`网络错误：${err.message}`);
    console.log(err);
  }

}
