import { Component, OnInit } from '@angular/core';
import { MasterConfigService } from '../../services/master-config.service';
import { BgConfigService } from '../../services/bg-config.service';
import { AdviceService } from '../../../api/advice.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-advice',
  templateUrl: './advice.component.html',
  styleUrls: ['./advice.component.less'],
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
export class AdviceComponent implements OnInit {

  hasSubmitted =  false;
  hasError = false;
  errorMsg = '';
  submitContent = '';
  bg: string[];

  constructor(
    private masterConfigService: MasterConfigService,
    private bgConfigService: BgConfigService,
    private adviceService: AdviceService
  ) { }

  ngOnInit() {
    this.masterConfigService.setConfig({
      primaryColor: '#000000',
      secondaryColor: '#F1C40F',
      showSidebar: false,
      showLoading: false
    });
    this.bg = this.bgConfigService.bg;
  }

  trySubmit() {
    this.submitContent = this.submitContent.trim();
    if (this.submitContent.length === 0) {
      this.hasError = true;
      this.errorMsg = '信息不能为空';
      return;
    }
    this.adviceService.add(this.submitContent,
    (data) => {
      if (data.result) {
        this.hasSubmitted = true;
        this.submitContent = '';
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

  reloadAdvice(e) {
    e.preventDefault();
    console.log(e.preventDefault);
    this.hasSubmitted = false;
  }

}
