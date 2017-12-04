import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../../../../../api/user.service';
import { User } from '../../../../../models/user';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.less']
})
export class DeleteUserComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {user: User},
    private userService: UserService,
  ) { }

  delete() {
    this.userService.delete({userid: this.data.user._id},
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
