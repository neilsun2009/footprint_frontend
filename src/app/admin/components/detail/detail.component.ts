import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../../../api/comment.service';
import { Comment } from '../../../../models/comment';
import { FieldService } from '../../../../api/field.service';
import { Field } from '../../../../models/field';
import { Match } from '../../../../models/match';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteCommentComponent } from './delete-comment/delete-comment.component';
import { DeleteFieldComponent } from './delete-field/delete-field.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less']
})
export class DetailComponent implements OnInit {

  limit: number;
  forecastOffset: number;
  postmatchOffset: number;
  fieldOffset: number;
  commentColumns: string[];
  fieldColumns: string[];
  forecasts: MatTableDataSource<Comment>;
  postmatches: MatTableDataSource<Comment>;
  fields: MatTableDataSource<Field>;
  forecastLength: number;
  postmatchLength: number;
  fieldLength: number;
  showLoading: boolean;
  access: string;
  match: Match;

  constructor(
    private commentService: CommentService,
    private fieldService: FieldService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.limit = 20;
    this.forecastOffset = 0;
    this.postmatchOffset = 0;
    this.fieldOffset = 0;
    this.showLoading = false;
    this.access = 'detail';
  }

  ngOnInit() {
    this.commentColumns = ['username', 'text', 'submit-time', 'modify-time', 'operations'];
    this.fieldColumns = ['username', 'price', 'seat', 'companion', 'operations'];
    this.route.data.subscribe((data: {match: Match}) => {
      this.match = data.match;
      this.getForecasts(this.forecastOffset, this.limit);
      this.getPostmatches(this.postmatchOffset, this.limit);
      this.getFields(this.fieldOffset, this.limit);
    });
  }

  getForecasts(offset, limit) {
    this.showLoading = true;
    this.commentService.getMulti(offset, limit, this.match._id, 'forecast', false,
    (data) => {
      if (data.result) {
        this.forecasts = new MatTableDataSource(data.data);
        this.forecastLength = data.count;
        this.showLoading = false;
      } else {
        this.handleError(data);
      }
    }, this.handleError);
  }

  getPostmatches(offset, limit) {
    this.showLoading = true;
    this.commentService.getMulti(offset, limit, this.match._id, 'postmatch', false,
    (data) => {
      if (data.result) {
        this.postmatches = new MatTableDataSource(data.data);
        this.postmatchLength = data.count;
        this.showLoading = false;
      } else {
        this.handleError(data);
      }
    }, this.handleError);
  }

  getFields(offset, limit) {
    this.showLoading = true;
    this.fieldService.getMulti(offset, limit, this.match._id, '',
    (data) => {
      if (data.result) {
        let fields = data.data[0]._fields;
        // console.log(data);
        this.fields = new MatTableDataSource(fields);
        this.postmatchLength = fields.length;
        this.showLoading = false;
      } else {
        this.handleError(data);
      }
    }, this.handleError);
  }

  changePage(type, e) {
    const { pageIndex, pageSize } = e;
    switch (type) {
      case 'forecast':
        this.forecastOffset = pageIndex * pageSize;
        this.getForecasts(this.forecastOffset, this.limit);
        break;
      case 'postmatch':
        this.postmatchOffset = pageIndex * pageSize;
        this.getPostmatches(this.postmatchOffset, this.limit);
        break;
      case 'field':
        this.fieldOffset = pageIndex * pageSize;
        break;
    }
    this.limit = pageSize;
  }


  deleteComment(comment) {
    let dialogRef = this.dialog.open(DeleteCommentComponent, {
      width: '400px',
      data: { comment }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('评论已删除', '确定', {
          duration: 1500
        });
      comment.commentType === 'forecast' ?
      this.getForecasts(this.forecastOffset, this.limit) :
      this.getPostmatches(this.postmatchOffset, this.limit);
      }
    });
  }

  deleteField(field) {
    let dialogRef = this.dialog.open(DeleteFieldComponent, {
      width: '400px',
      data: { field }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('现场记录已删除', '确定', {
          duration: 1500
        });
        this.getFields(this.fieldOffset, this.limit);
      }
    });
  }

  private handleError(err) {
    alert(`网络错误：${err.message}`);
    console.log(err);
  }

}
