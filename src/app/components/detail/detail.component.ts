import { Component, OnInit } from '@angular/core';
import { Match } from '../../../models/match';
import { User } from '../../../models/user';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MasterConfigService } from '../../services/master-config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../api/auth.service';
import { MatchService } from '../../../api/match.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less'],
  animations: [
    trigger('header', [
      state('*', style({opacity: 1, width: '*'})),
      transition(':enter', [
        style({width: 0, opacity: 0.4}),
        animate('500ms ease-out')
      ])
    ]),
    trigger('score', [
      state('*', style({transform: 'rotate(0deg)  scale(1.0)'})),
      transition(':enter', [
        style({transform: 'rotate(-230deg)  scale(0)'}),
        animate('1000ms ease-out')
      ])
    ]),
    trigger('logo', [
      state('*', style({transform: 'rotateY(30deg) rotateX(5deg) scale(1.1)'})),
      transition(':enter', [
        style({transform: 'rotateY(-690deg) rotateX(0deg) scale(0)'}),
        animate('1000ms ease-out')
      ])
    ]),
    trigger('logoRight', [
      state('*', style({transform: 'rotateY(-30deg) rotateX(5deg) scale(1.1)'})),
      transition(':enter', [
        style({transform: 'rotateY(690deg) rotateX(0deg) scale(0)'}),
        animate('1000ms ease-out')
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
export class DetailComponent implements OnInit {

  detail: Match;
  private loggedUser: User;
  primaryColor: string;
  secondaryColor: string;

  onSection: string;

  showScoreModel: boolean;

  constructor(
    private masterConfigService: MasterConfigService,
    private authService: AuthService,
    private matchService: MatchService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.showScoreModel = false;
  }

  ngOnInit() {
    document.body.scrollTop = 0;
    this.loggedUser = this.authService.user;
    this.route.data.subscribe((data: {match: Match}) => {
      let timeMinus: number;
      this.detail = data.match;
      this.primaryColor = this.detail.colors[0] || '#000000';
      this.secondaryColor = this.detail.colors[1] || '#ffffff';
      this.masterConfigService.setConfig({
        primaryColor: this.primaryColor,
        secondaryColor: this.secondaryColor,
        showSidebar: false,
        showLoading: false
      });
      // section
      timeMinus = +new Date() - +new Date(this.detail.startTime);
      if (timeMinus < -30 * 60 * 1000) {
          this.onSection = 'forecast';
          // angular.element('#forecast-plus').addClass('show');
      } else if (timeMinus <= 2.5 * 60 * 60 * 1000) {
        this.onSection = 'chat';
      } else {
        this.onSection = 'postmatch';
      }
    });
  }

  changeScoreCheck() {
    if (!this.loggedUser || this.loggedUser.access !== 'administrator') {
      return;
    }
    this.showScoreModel = true;
  }

  changeScore() {
    if (!this.loggedUser || this.loggedUser.access !== 'administrator') {
      return;
    }
    this.matchService.update({
      matchid: this.detail._id,
      teams: this.detail.teams
    }, (data) => {
      alert(data.message);
      this.showScoreModel = false;
    }, (err) => {
      alert(`网络错误：${err.message}`);
      console.log(err);
    });
  }

}
