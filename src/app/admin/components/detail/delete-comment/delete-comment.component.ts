import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommentService } from '../../../../../api/comment.service';
import { Comment } from '../../../../../models/comment';

@Component({
  selector: 'app-delete-comment',
  templateUrl: './delete-comment.component.html',
  styleUrls: ['./delete-comment.component.less']
})
export class DeleteCommentComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteCommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {comment: Comment},
    private commentService: CommentService,
  ) { }

  delete() {
    this.commentService.delete({commentid: this.data.comment._id},
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
