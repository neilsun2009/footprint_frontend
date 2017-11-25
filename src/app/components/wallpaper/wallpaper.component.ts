import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MasterConfigService } from '../../services/master-config.service';
import { WallpaperService } from '../../../api/wallpaper.service';
import { Wallpaper } from '../../../models/wallpaper';

@Component({
  selector: 'app-wallpaper',
  templateUrl: './wallpaper.component.html',
  styleUrls: ['./wallpaper.component.less'],
  animations: [
    trigger('wallpaper', [
      state('*', style({opacity: 1})),
      transition(':enter', [
        style({opacity: 0}),
        animate('500ms ease-out')
      ])
    ])
  ]
})
export class WallpaperComponent implements OnInit {

  wallpapers: Wallpaper[];

  constructor(
    private masterConfigService: MasterConfigService,
    private wallpaperService: WallpaperService
  ) { }

  ngOnInit() {
    this.masterConfigService.setConfig({
      primaryColor: '#000000',
      secondaryColor: '#ffffff',
      showSidebar: false,
      showLoading: false
    });
    this.wallpaperService.getMulti('',
    (data) => {
      this.wallpapers = data.data;
    }, (err) => {
      alert(`网络错误：${err.message}`);
      console.log(err);
    });
  }

}
