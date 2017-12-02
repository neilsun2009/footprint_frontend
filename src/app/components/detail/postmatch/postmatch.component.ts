import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Match } from '../../../../models/match';
import { User } from '../../../../models/user';
import { Comment } from '../../../../models/comment';
import { CommentService } from '../../../../api/comment.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-postmatch',
  templateUrl: './postmatch.component.html',
  styleUrls: ['./postmatch.component.less'],
  animations: [
    trigger('loading', [
      state('true', style({opacity: 1})),
      // transition('false => true', animate(100)),
      transition(':leave', [
        animate('300ms ease-in', style({opacity: 0}))
      ])
    ]),
    trigger('fadeIn', [
      state('true', style({opacity: 1})),
      transition(':enter', [
        style({opacity: 0}),
        animate('500ms ease-out')
      ])
    ]),
    trigger('scale', [
      state('true', style({transform: 'scale(1)'})),
      transition(':enter', [
        style({transform: 'scale(0)'}),
        animate('300ms 300ms ease-out')
      ])
    ]),
    trigger('flyUp', [
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
export class PostmatchComponent implements OnInit {

  @Input() match: Match;
  @Input() user: User;
  showAddModel: boolean;
  showEdit: boolean;
  showAdd: boolean;
  primaryColor: string;
  secondaryColor: string;
  postmatches: Comment[];
  showLoading: boolean;
  noResult: boolean;

  addParam: {
    matchid: string;
    commentType: string;
    text: string;
    star: number;
  };

  constructor(
    private commentService: CommentService,
    private router: Router
  ) {
    this.showAddModel = false;
    this.showEdit = false;
    this.showLoading = true;
    this.showAdd = false;
    this.noResult = false;
  }

  ngOnInit() {
    this.primaryColor = this.match.colors[0];
    this.secondaryColor = this.match.colors[1];
    this.addParam = {
      matchid: this.match._id,
      commentType: 'postmatch',
      text: '',
      star: 2.5
    };
    this.getPostmatches();
  }

  getPostmatches() {
    this.postmatches = [];
    this.showLoading = true;
    this.commentService.getMulti(this.match._id, 'postmatch', false,
    (data) => {
      this.postmatches = data.data;
      this.showLoading = false;
      this.noResult = !this.postmatches.length;
      if ((+new Date() - +new Date(this.match.startTime)) > 0) {
        this.showEdit = true;
        if (this.user && this.user._id) {
          this.showAdd = true;
          this.postmatches.forEach((elem) => {
            if (elem._user['_id'] === this.user._id) {
              this.showAdd = false;
            }
          });
        } else {
          this.showAdd = false;
        }
      }
    }, (err) => {
      alert(`网络错误：${err.message}`);
      console.log(err);
    });
  }

  addPostmatch() {
    if (!this.user) {
      alert('请先登录');
      this.router.navigate(['/login']);
      return;
    }
    if (!this.addParam.text.length) {
      alert('内容不能为空');
      return;
    }
    this.commentService.add(this.addParam,
    (data) => {
      if (data.result) {
        this.showAddModel = false;
        this.showAdd = false;
        this.noResult = false;
        this.postmatches.push(data.data);
      } else {
        if (data.message === 'login required') {
          alert('请先登录');
          window.open('/login');
        } else {
          alert(`网络错误：${data.message}`);
          console.log(data);
        }
      }
    }, (err) => {
      alert(`网络错误：${err.message}`);
      console.log(err);
    });
  }

  updateStar(event) {
    this.addParam.star = event;
  }

  onDelete() {
    this.getPostmatches();
  }

}
