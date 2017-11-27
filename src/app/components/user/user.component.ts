import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterConfigService } from '../../services/master-config.service';
import { CommentService } from '../../../api/comment.service';
import { FieldService } from '../../../api/field.service';
import { AuthService } from '../../../api/auth.service';
import { UserService } from '../../../api/user.service';
import { User } from '../../../models/user';
import { Team } from '../../../models/team';
import { Color } from '../../../models/color';
import { TeamService } from '../../../api/team.service';
import { ColorService } from '../../../api/color.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less'],
  animations: [
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
export class UserComponent implements OnInit {

  user: User;
  primaryColor: string;
  secondaryColor: string;
  chatCount: number;
  forecastCount: number;
  postmatchCount: number;
  fieldCount: number;
  loggedUser: User;

  updateParam: User;

  colors: Color[];
  teams: Team[];

  showUpdateModel: boolean;

  constructor(
    private masterConfigService: MasterConfigService,
    private commentService: CommentService,
    private fieldService: FieldService,
    private authService: AuthService,
    private teamService: TeamService,
    private colorService: ColorService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.showUpdateModel = false;
  }

  ngOnInit() {
    this.loggedUser = this.authService.user;
    this.masterConfigService.setConfig({
      showLoading: true
    });
    this.route.data.subscribe((data: {user: User}) => {
      this.user = data.user;
      this.updateParam = this.user;
      // console.log(data.user);
      this.primaryColor = this.user.colors[0] || '#000000';
      this.secondaryColor = this.user.colors[1] || '#ffffff';
      this.masterConfigService.setConfig({
        primaryColor: this.primaryColor,
        secondaryColor: this.secondaryColor,
        showSidebar: false,
        showLoading: false
      });
      this.getChatCount(this.user._id);
      this.getForecastCount(this.user._id);
      this.getPostmatchCount(this.user._id);
      this.getFieldCount(this.user._id);
      this.getColors();
      this.getTeams();
    });
  }

  updateUser() {
    if (!this.loggedUser || this.loggedUser._id !== this.user._id) {
      alert('请先登录');
      this.router.navigate(['/login']);
      return;
    }
    this.userService.updateSelf(this.updateParam,
    data => {
      this.showUpdateModel = false;
      this.user = data.data;
      this.updateParam = this.user;
      this.authService.user = this.user;
      this.loggedUser = this.user;
      this.primaryColor = this.user.colors[0];
      this.secondaryColor = this.user.colors[1];
      this.masterConfigService.setConfig({
        primaryColor: this.primaryColor,
        secondaryColor: this.secondaryColor
      });
    }, err => {
      if (err.message === 'login required') {
        alert('请先登录');
        window.open('/login');
      } else {
        this.handleError(err);
      }
    });
  }

  selectColor(color: {value: Color}) {
    this.updateParam.colors = color.value.colors;
  }

  deleteTeam(index: number) {
    this.updateParam._teams.splice(index, 1);
  }

  selectTeam(team: {value: Team}) {
    this.updateParam._teams.push(team.value);
  }

  getColors() {
    this.colorService.getMulti('', '',
    (data) => {
      this.colors = data.data;
    }, (err) => {
      this.handleError(err);
    });
  }

  getTeams() {
    this.teamService.getMulti('', '',
    (data) => {
      this.teams = data.data;
    }, (err) => {
      this.handleError(err);
    });
  }

  logout() {
    if (!this.loggedUser || this.loggedUser._id !== this.user._id) {
      return;
    }
    this.authService.logout(() => {
      this.authService.hasLoggedIn = false;
      this.authService.user = null;
      this.loggedUser = null;
      this.masterConfigService.setConfig({
        loggedIn: false
      });
    }, (err) => {
      this.handleError(err);
    });
  }

  private getChatCount(userid) {
    this.commentService.getCount('', 'chat', userid,
    (data) => {
        if (data.result) {
            this.chatCount = data.count;
        } else {
            alert(data.message);
        }
    }, (err) => {
      this.handleError(err);
    });
  }

  private getForecastCount(userid) {
    this.commentService.getCount('', 'forecast', userid,
    (data) => {
        if (data.result) {
            this.forecastCount = data.count;
        } else {
            alert(data.message);
        }
    }, (err) => {
      this.handleError(err);
    });
  }

  private getPostmatchCount(userid) {
    this.commentService.getCount('', 'postmatch', userid,
    (data) => {
        if (data.result) {
            this.postmatchCount = data.count;
        } else {
            alert(data.message);
        }
    }, (err) => {
      this.handleError(err);
    });
  }

  private getFieldCount(userid) {
    this.fieldService.getCount(userid,
    (data) => {
      if (data.result) {
          this.fieldCount = data.count;
      } else {
        this.handleError(data);
      }
    }, (err) => {
      this.handleError(err);
    });
  }

  private handleError(err) {
    alert(`网络错误：${err.message}`);
    console.log(err);
  }

}
