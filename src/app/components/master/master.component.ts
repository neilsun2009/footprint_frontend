import { Component, OnInit, enableProdMode } from '@angular/core';
import { MasterConfigService } from '../../services/master-config.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

enableProdMode();

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.less'],
  animations: [
    trigger('loading', [
      state('true', style({opacity: 1, display: 'block'})),
      state('false', style({opacity: 0, display: 'none'})),
      // transition('false => true', animate(100)),
      transition('true => false', animate(100))
    ])
  ]
})
export class MasterComponent implements OnInit {

  primaryColor: string;
  secondaryColor: string;
  menuConfigs: {
    routerLink: string;
    name: string;
    show: boolean;
  }[];
  showSidebar: boolean;
  showLoading: boolean;

  constructor(private masterConfigService: MasterConfigService) {
    this.primaryColor = '#000000';
    this.secondaryColor = '#ffffff';
    this.menuConfigs = [
      { routerLink: '/', name: '首页', show: true },
      { routerLink: '/login', name: '登录/注册', show: true },
      { routerLink: '/match', name: '赛事列表', show: true },
      { routerLink: '/wallpaper', name: '壁纸集', show: true },
      { routerLink: `/user`, name: '个人中心', show: false },
      { routerLink: '/advice', name: '添加', show: true },
      { routerLink: '/about', name: '关于', show: true }
    ];
    this.showSidebar = false;
    this.showLoading = false;
   }

  ngOnInit() {
    // get configs
    this.masterConfigService.masterConfig$.subscribe((config) => {
      this.primaryColor = config.primaryColor || this.primaryColor;
      this.secondaryColor = config.secondaryColor || this.secondaryColor;
      this.showSidebar = config.showSidebar === undefined ? this.showSidebar : config.showSidebar;
      this.showLoading = config.showLoading === undefined ? this.showLoading : config.showLoading;
    });
  }

  toggleMenu() {
    this.showSidebar = !this.showSidebar;
  }

}
