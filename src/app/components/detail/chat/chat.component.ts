import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Match } from '../../../../models/match';
import { User } from '../../../../models/user';
import { Comment } from '../../../../models/comment';
import { CommentService } from '../../../../api/comment.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import io from 'socket.io-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less'],
  animations: [
    trigger('loading', [
      state('true', style({opacity: 1})),
      // transition('false => true', animate(100)),
      transition(':leave', [
        animate('300ms ease-in', style({opacity: 0}))
      ])
    ]),
    trigger('flyUp', [
      state('true', style({opacity: 1, transform: 'translateY(0px)'})),
      transition(':enter', [
        style({transform: 'translateY(500px)', opacity: 0}),
        animate('500ms ease-out')
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
export class ChatComponent implements OnInit, OnDestroy {

  @Input() match: Match;
  @Input() user: User;
  showDeleteModel: boolean;
  primaryColor: string;
  secondaryColor: string;
  showLoading: boolean;
  noResult: boolean;
  showSender: boolean;
  chats: Comment[];
  deleteParam: Comment;

  private socket;

  sendParam: {
    text: string;
    matchid: string;
    commentType: string;
  };

  constructor(
    private commentService: CommentService,
    private router: Router
  ) {
    this.showDeleteModel = false;
    this.showLoading = true;
    this.showSender = false;
    this.noResult = false;
  }

  ngOnDestroy() {
    if (this.socket.id) {
      this.socket.close();
    }
  }

  ngOnInit() {
    this.primaryColor = this.match.colors[0];
    this.secondaryColor = this.match.colors[1];
    this.sendParam = {
      matchid: this.match._id,
      commentType: 'chat',
      text: ''
    };
    this.socket = io({
      autoConnect: false
    });
    this.socket.on('chat-receive', (newChat) => {
      this.getNewChat(newChat);
    });
    this.getInitChats();
  }

  getInitChats() {
    this.chats = [];
    this.showLoading = true;
    this.commentService.getMulti(this.match._id, 'chat', false,
    (data) => {
      let deltaTime = +new Date() - +new Date(this.match.startTime);
      this.chats = data.data;
      this.showLoading = false;
      this.noResult = !this.chats.length;
      // in time
      if (deltaTime >= -60 * 60 * 1000 && deltaTime <= 240 * 60 * 1000) {
        this.showSender = true;
        setTimeout(function() {
          document.body.scrollTop = document.documentElement.offsetHeight;
        }, 50);
        this.socket.open();
        this.socket.emit('chat-match', {matchid: this.match._id});
      }
    }, this.errorHandler);
  }

  checkDelete(index) {
    if (!this.user || this.user.access !== 'administrator') {
      return;
    }
    this.deleteParam = this.chats[index];
    this.showDeleteModel = true;
  }

  getNewChat(chat) {
    if (chat._user._id === this.user._id) {
      return;
    }
    this.noResult = false;
    this.chats.push(chat);
  }

  sendChat() {
    if (!this.user) {
      alert('请先登录');
      this.router.navigate(['/login']);
      return;
    }
    if (!this.sendParam.text.length) {
      alert('内容不能为空');
      return;
    }
    this.commentService.add(this.sendParam,
    (data) => {
      if (data.result) {
        this.noResult = false;
        this.chats.push(data.data);
        this.sendParam.text = '';
        setTimeout(function() {
          document.body.scrollTop = document.documentElement.offsetHeight;
        }, 50);
        // web socket
        this.socket.emit('chat-data', data.data);
      } else {
        this.errorHandler(data);
      }
    }, this.errorHandler);
  }

  deleteChat() {
    if (!this.user || this.user.access !== 'administrator') {
      return;
    }
    this.commentService.delete({commentid: this.deleteParam._id},
    (data) => {
      if (data.result) {
        this.showDeleteModel = false;
        if (this.socket.id) {
          this.socket.close();
        }
        this.getInitChats();
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
