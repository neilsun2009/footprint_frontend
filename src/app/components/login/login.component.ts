import { Component, OnInit } from '@angular/core';
import { MasterConfigService } from '../../services/master-config.service';
import { AuthService } from '../../../api/auth.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  animations: [
    trigger('error', [
      state('true', style({height: '*'})),
      transition('false => true', [
        style({height: 0, opacity: 0}),
        animate('200ms ease-out', style({height: '*', opacity: 1}))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {

  hasLoggedIn: boolean;
  hasError: boolean;
  errorMsg: string;
  param: {
    username: string;
    password: string;
  };
  redirectUrl: string;
  remainSeconds: number;

  constructor(
    private masterConfigService: MasterConfigService,
    private authService: AuthService,
    private router: Router
  ) {
    this.hasLoggedIn = false;
    this.hasError = false;
    this.errorMsg = '';
    this.param = {
      username: '',
      password: ''
    };
    this.redirectUrl = '/';
    this.remainSeconds = 4;
  }

  ngOnInit() {
    this.masterConfigService.setConfig({
      primaryColor: '#000000',
      secondaryColor: '#F1C40F',
      showSidebar: false,
      showLoading: false
    });
  }

  tryLogin() {
    this.authService.login(this.param.username, this.param.password,
    (data) => {
      if (data.result) {
        this.hasLoggedIn = true;
        this.authService.hasLoggedIn = true;
        this.authService.user = data.data;
        this.redirectUrl = this.authService.redirectUrl;
        this.masterConfigService.setConfig({
          loggedIn: true
        });
        this.countDown();
      } else  {
        this.hasError = true;
        this.errorMsg = data.message;
      }
    }, (err) => {
      this.hasError = true;
      this.errorMsg = `网络错误：${err.status}`;
      console.log(err);
    });
  }

  countDown() {
    if (--this.remainSeconds) {
      setTimeout(() => {
        this.countDown();
      }, 1000);
    } else {
      this.router.navigate([this.redirectUrl]);
    }
  }
}
