import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

const transitionTime = 1500;

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.less'],
  animations: [
    trigger('bg', [
      state('*', style({opacity: 1})),
      transition(':enter', [
        style({opacity: 0}),
        animate('1000ms ease-out', style({opacity: 1}))
      ]),
      transition('* => *', [
        style({opacity: 0}),
        animate(`${transitionTime}ms linear`, keyframes([
          style({opacity: 1, offset: 0}),
          style({opacity: 0, offset: 0.5}),
          style({opacity: 1, offset: 1})
        ]))
      ])
    ])
  ]
})
export class BackgroundComponent implements OnInit {

  @Input() bgInput: string | string[];
  private selectedBg: string;
  animBg: string;

  private arrConfig: {
    length: number;
    selectedNum: number;
  };

  get bg(): string {
    return `url(${this.selectedBg})`;
  }

  constructor() {
    this.selectedBg = '/assets/bg-null.png';
    this.arrConfig = {length: 0, selectedNum: 0};
  }

  ngOnInit() {
    const { bgInput, arrConfig } = this;
    console.log(bgInput);
    if (Array.isArray(bgInput)) {
      arrConfig.length = bgInput.length;
      this.changeBg(true);
    } else {
      this.selectedBg = bgInput;
      this.animBg = bgInput;
    }
  }

  changeBg(isFirst: boolean) {
    const { arrConfig, bgInput } = this;
    let newNum = Math.floor(Math.random() * arrConfig.length);
    while (newNum === arrConfig.selectedNum) {
      newNum = Math.floor(Math.random() * arrConfig.length);
    }
    arrConfig.selectedNum = newNum;
    this.animBg = bgInput[arrConfig.selectedNum];
    // if (isFirst) {
    //   this.selectedBg = bgInput[arrConfig.selectedNum];
    // } else {
    //   setTimeout(() => {
    //     this.selectedBg = bgInput[arrConfig.selectedNum];
    //   }, transitionTime / 2);
    // }
    setTimeout(() => {
      this.selectedBg = bgInput[arrConfig.selectedNum];
    }, isFirst ? 0 : transitionTime / 2);
    setTimeout(() => {
      this.changeBg(false);
    }, 10000);
  }

}
