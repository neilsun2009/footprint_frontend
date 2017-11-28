import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Match } from '../../../../models/match';
import { User } from '../../../../models/user';
import { Comment } from '../../../../models/comment';
import { CommentService } from '../../../../api/comment.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.less'],
  animations: [
    trigger('comment', [
      state('*', style({opacity: 1, transform: 'translateY(0px)'})),
      transition(':enter', [
        style({transform: 'translateY(500px)', opacity: 0}),
        animate('500ms ease-out')
      ])
    ]),
    trigger('model', [
      state('true', style({opacity: 1, transform: 'translateY(0)'})),
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(-1000px)'}),
        animate('500ms ease-out')
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({opacity: 0, transform: 'translateY(-1000px)'}))
      ])
    ])
  ]
})
export class CommentComponent implements OnInit {

  @Input() match: Match;
  @Input() user: User;
  @Input() comment: Comment;
  @Input() showEdit: boolean;
  @Output() onDelete = new EventEmitter<void>();

  commentType: string;
  primaryColor: string;
  secondaryColor: string;

  showUpdateModel: boolean;
  showDeleteModel: boolean;

  updateParam: {
    commentid: string,
    text: string,
    star?: number
  };

  constructor(
    private commentService: CommentService,
    private router: Router
  ) {
    this.showUpdateModel = false;
    this.showDeleteModel = false;
  }

  ngOnInit() {
    this.commentType = this.comment.commentType;
    this.primaryColor = this.match.colors[0];
    this.secondaryColor = this.match.colors[1];
    this.updateParam = {
      commentid: this.comment._id,
      text: this.comment.text
    };
    if (this.commentType === 'postmatch') {
      this.updateParam.star = this.comment.star;
    }
  }

  updateStar(event) {
    this.updateParam.star = event;
  }

  updateComment() {
    if (!this.user) {
      alert('请先登录');
      this.router.navigate(['/login']);
      return;
    }
    this.commentService.update(this.updateParam,
    (data) => {
      if (data.result) {
        this.showUpdateModel = false;
        this.comment.text = this.updateParam.text;
        this.comment.star = this.updateParam.star;
      } else {
        this.errorHandler(data);
      }
    }, this.errorHandler);
  }

  deleteComment() {
    if (!this.user) {
      alert('请先登录');
      this.router.navigate(['/login']);
      return;
    }
    this.commentService.delete({commentid: this.comment._id},
    (data) => {
      if (data.result) {
        this.showDeleteModel = false;
        this.onDelete.emit();
      } else {
        this.errorHandler(data);
      }
    }, this.errorHandler);
  }

  errorHandler(err) {
    if (err.message === 'login required') {
      alert('请先登录');
      window.open('/login');
    } else {
      alert(`网络错误：${err.message}`);
      console.log(err);
    }
  }

}
