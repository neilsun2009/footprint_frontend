import { Component, OnInit } from '@angular/core';
import { MasterConfigService } from '../../services/master-config.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {

  constructor(private masterConfigService: MasterConfigService) { }

  ngOnInit() {
    this.masterConfigService.setConfig({
      primaryColor: '#000000',
      secondaryColor: '#F1C40F',
      showSidebar: false,
      showLoading: false
    });
  }

}
