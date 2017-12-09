import { Component, OnInit } from '@angular/core';
import { MasterConfigService } from '../../services/master-config.service';
import { BgConfigService } from '../../services/bg-config.service';
import { AuthService } from '../../../api/auth.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less'],
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
export class SignupComponent implements OnInit {

  hasSignedUp: boolean;
  hasError: boolean;
  errorMsg: string;
  param: {
    username: string;
    password: string;
    passwordRepeat: string;
  };
  remainSeconds: number;
  bg: string[];

  constructor(
    private masterConfigService: MasterConfigService,
    private bgConfigService: BgConfigService,
    private authService: AuthService,
    private router: Router,
    private titleService: TitleService
  ) {
    this.hasSignedUp = false;
    this.hasError = false;
    this.errorMsg = '';
    this.param = {
      username: '',
      password: '',
      passwordRepeat: ''
    };
    this.remainSeconds = 4;
  }

  ngOnInit() {
    this.masterConfigService.setConfig({
      primaryColor: '#000000',
      secondaryColor: '#F1C40F',
      showSidebar: false,
      showLoading: false
    });
    this.titleService.setTitle('注册');
    this.bg = this.bgConfigService.bg;
  }

  trySignup() {
    let { username, password, passwordRepeat} = this.param;
    password = password.trim();
    passwordRepeat = passwordRepeat.trim();
    if (password !== passwordRepeat) {
      this.hasError = true;
      this.errorMsg = '两次密码输入不一致';
      return;
    }
    this.authService.signup(username, password,
    (data) => {
      if (data.result) {
        this.hasSignedUp = true;
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
      this.router.navigate(['/login']);
    }
  }

}
