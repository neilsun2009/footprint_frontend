import { Component, OnInit } from '@angular/core';
import { MasterConfigService } from '../../services/master-config.service';
import { BgConfigService } from '../../services/bg-config.service';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {

  bg: string[];
  logoBig: string;
  constructor(
    private masterConfigService: MasterConfigService,
    private bgConfigService: BgConfigService,
    private titleService: TitleService
  ) { }

  ngOnInit() {
    this.masterConfigService.setConfig({
      primaryColor: '#000000',
      // primaryColor: '#ff0000',
      secondaryColor: '#F1C40F',
      showSidebar: false,
      showLoading: false
    });
    this.bg = this.bgConfigService.bgs;
    this.logoBig = this.bgConfigService.logoBig;
    this.titleService.setTitle('首页');
  }

}
