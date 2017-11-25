import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MasterConfigService } from '../../services/master-config.service';
import { AuthService } from '../../../api/auth.service';
import { MatchService } from '../../../api/match.service';
import { User } from '../../../models/user';
import { Match } from '../../../models/match';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { parse } from 'query-string';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.less'],
  animations: [
    trigger('loading', [
      state('true', style({opacity: 1})),
      // transition('false => true', animate(100)),
      transition(':leave', [
        animate('300ms ease-in', style({opacity: 0, }))
      ])
    ]),
    trigger('match', [
      state('*', style({opacity: 1, height: '*', transform: 'translateX(0)'})),
      // transition('false => true', animate(100)),
      transition(':enter', [
        style({opacity: 0.5, height: 0}),
        animate('500ms ease-out')
      ])
    ]),
  ]
})
export class MatchComponent implements OnInit {

  query: {
    year: string;
    month: string;
    keyWord: string;
    onlyField: boolean;
    limit: number;
    offset: number;
  };
  user: User;
  matches: Match[];
  showLoading: boolean;
  noResult: boolean;
  monthEnable: boolean;
  scrollLock: boolean;

  constructor(
    private masterConfigService: MasterConfigService,
    private authService: AuthService,
    private matchService: MatchService,
    private route: ActivatedRoute
  ) {
    this.showLoading = true;
    this.noResult = false;
    this.monthEnable = true;
    this.scrollLock = false;
    this.matches = [];
  }

  ngOnInit() {
    // query
    let params = this.route.snapshot.queryParamMap;
    this.query = {
      year: params.get('year') || new Date().getFullYear() + '',
      month: params.get('month') || (new Date().getMonth() + 1) + '',
      keyWord: params.get('keyWord') || '',
      onlyField: params.get('onlyField') === 'true',
      limit: 10,
      offset: 0
    };
    // master config
    this.masterConfigService.setConfig({
      primaryColor: '#2C3E50',
      secondaryColor: '#F1C40F',
      showSidebar: false,
      showLoading: false
    });
    // logged in user
    this.user = this.authService.user;
    this.getMatches();
    // history api
    window.onpopstate = (event) => {
      console.log(1);
      this.popState(event);
    };
    history.replaceState(this.query, 'match', `${location.pathname}${location.search}`);
  }

  popState(event) {
    if (location.pathname !== '/match') {
      window.onpopstate = null;
      return;
    }
    if (event.state) {
      this.query = event.state;
    } else {
      let params = parse(location.search);
      this.query = {
        year: params.year || new Date().getFullYear() + '',
        month: params.month || (new Date().getMonth() + 1) + '',
        keyWord: params.keyWord || '',
        onlyField: params.onlyField === 'true',
        limit: 10,
        offset: 0
      };
    }
    this.getMatches();
  }

  scrollHandler() {
    let scrollTop = document.body.scrollTop,
      height = document.documentElement.offsetHeight,
      clientHeight = document.documentElement.clientHeight;
    // console.log(scrollTop + ' ' + height + ' ' + clientHeight);
    if (height - clientHeight - scrollTop < 50 && !this.scrollLock) {
        this.scrollLock = true;
        this.getMatches();
    }
  }

  checkField() {
    this.query.onlyField = !this.query.onlyField;
    this.newSearch();
  }

  newSearch() {
    this.matches = [];
    history.pushState(this.query, 'match',
      `match?year=${this.query.year}&month=${this.query.month}` + 
      `&keyWord=${encodeURIComponent(this.query.keyWord)}&onlyField=${this.query.onlyField}`);
    this.query.offset = 0;
    this.getMatches();
  }

  getMatches() {
    const { year, month, keyWord, onlyField, limit, offset} = this.query;
    let before = '', after = '';
    // init
    this.noResult = false;
    this.showLoading = true;
    // calculate before & after
    if (year !== 'ALL') {
      this.monthEnable = true;
      if (month === 'ALL') {
        before = new Date(+year + 1, 0).toUTCString();
        after = new Date(+year, 0).toUTCString();
      } else {
        before = new Date(+year, +month).toUTCString();
        after = new Date(+year, +month - 1).toUTCString();
      }
    } else {
      this.query.month = 'ALL';
      this.monthEnable = false;
    }
    // get data
    this.matchService.getMulti(
      offset, limit, keyWord, before, after, 'asc', true, onlyField,
      (data) => {
        this.scrollLock = false;
        this.showLoading = false;
        this.matches = this.matches.concat(data.data);
        if (data.count === 0) {
          this.noResult = true;
          window.onscroll = null;
        } else {
          if (data.count <= offset + limit) {
            window.onscroll = null;
          } else {
            this.query.offset += this.query.limit;
            window.onscroll = () => {
              this.scrollHandler();
            };
          }
        }
      }, (err) => {
        alert(`网络错误：${err.message}`);
        console.log(err);
      });
  }

}
