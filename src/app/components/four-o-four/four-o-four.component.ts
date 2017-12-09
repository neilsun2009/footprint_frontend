import { Component, OnInit } from '@angular/core';
import { MasterConfigService } from '../../services/master-config.service';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-four-o-four',
  templateUrl: './four-o-four.component.html',
  styleUrls: ['./four-o-four.component.less']
})
export class FourOFourComponent implements OnInit {

  constructor(
    private masterConfigService: MasterConfigService,
    private titleService: TitleService
  ) { }

  ngOnInit() {
    this.masterConfigService.setConfig({
      primaryColor: '#C0392B',
      secondaryColor: '#F1C40F',
      showSidebar: false,
      showLoading: true
    });
    this.titleService.setTitle('页面未找到');
    setTimeout(() => {
      this.masterConfigService.setConfig({
        showLoading: false
      });
    }, 200);
  }

}
