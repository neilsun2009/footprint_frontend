import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FieldService } from '../../../../../api/field.service';
import { Field } from '../../../../../models/field';

@Component({
  selector: 'app-delete-field',
  templateUrl: './delete-field.component.html',
  styleUrls: ['./delete-field.component.less']
})
export class DeleteFieldComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteFieldComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {field: Field},
    private fieldService: FieldService,
  ) { }

  delete() {
    this.fieldService.delete({fieldid: this.data.field._id},
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
