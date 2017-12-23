import { Component, ElementRef, OnInit, OnDestroy, Input, Renderer2, OnChanges, SimpleChange } from '@angular/core';
import { trigger, state, style, animate, keyframes, transition } from '@angular/animations';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.less'],
  animations: [
    trigger('line', [
      state('right', style({right: '*'})),
      state('left', style({left: '*'})),
      transition('none => right', [
        // style({right: '100%'}),
        animate('1500ms ease-out', keyframes([
          style({right: '100%', offset: 0}),
          style({right: '*', transform: 'translateX(10px)', offset: 0.7}),
          style({right: '*', transform: 'translateX(0)', offset: 1})
        ]))
      ]),
      transition('none => left', [
        // style({left: '100%'}),
        animate('1500ms ease-out', keyframes([
          style({left: '100%', offset: 0}),
          style({left: '*', transform: 'translateX(-10px)', offset: 0.7}),
          style({left: '*', transform: 'translateX(0)', offset: 1})
        ]))
      ])
    ]),
    trigger('fill', [
      state('move', style({width: '*'})),
      transition('none => move', [
        // style({width: '0'}),
        animate('1500ms ease-out', keyframes([
          style({width: '0%', offset: 0}),
          style({width: '*', transform: 'scaleX(1.05)', offset: 0.7}),
          style({width: '*', transform: 'scaleX(1)', offset: 1})
        ]))
      ])
    ])
  ]
})
export class BarComponent implements OnInit, OnDestroy, OnChanges {

  @Input() primaryColor: string;
  @Input() secondaryColor: string;
  @Input() homeColor: string;
  @Input() awayColor: string;
  @Input() home: string;
  @Input() away: string;
  private homeNum: number;
  private awayNum: number;
  private ratio: number;
  left: string;
  right: string;
  fillLeft: string;
  // fillRight: string;
  fillWidth: string;
  preAnimLine: string;
  animLine: string;
  animFill: string;
  transformOrigin: string;

  fillColor: string;
  bgColor: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.animLine = 'none';
    this.animFill = 'none';
    if (this.home[this.home.length - 1] === '%') {
      this.homeNum = +this.home.substr(0, this.home.length - 1);
      this.awayNum = +this.away.substr(0, this.away.length - 1);
    } else {
      this.homeNum = +this.home;
      this.awayNum = +this.away;
    }
    if (this.homeNum === 0 && this.awayNum === 0) {
      this.ratio = 50;
    } else {
      this.ratio = 100 * this.homeNum / (this.homeNum + this.awayNum);
    }
    // this.ratio = Math.min(99.5, this.ratio);
    // this.ratio = Math.max(0.5, this.ratio);
    if (this.ratio < 50) {
      this.left = this.ratio + '%';
      this.right = 'auto';
      this.fillLeft = 'auto';
      this.fillWidth = (100 - this.ratio) + '%';
      this.transformOrigin = 'right';
      this.preAnimLine = 'left';
      this.fillColor = this.awayColor;
      this.bgColor = this.homeColor;
    } else {
      this.left = 'auto';
      this.right = (100 - this.ratio) + '%';
      this.fillLeft = '0';
      this.fillWidth = /*this.ratio === 50 ? '0' : */this.ratio + '%';
      this.preAnimLine = 'right';
      this.transformOrigin = 'left';
      this.fillColor = this.homeColor;
      this.bgColor = this.awayColor;
    }
    this.scrollHandler();
    window.addEventListener('scroll', () => {
      this.scrollHandler();
    });
  }

  ngOnDestroy() {
    window.onscroll = null;
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if (changes['primaryColor']) {
        let elem = this.el.nativeElement,
          color = changes['primaryColor'].currentValue,
          fill = elem.getElementsByClassName('fill')[0],
          line = elem.getElementsByClassName('linemovable')[0];
        // console.log(fill, line);
        // fill.style.backgroundColor = color;
        line.style.backgroundColor = color;
    }
  }

  scrollHandler() {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop,
      clientHeight = document.documentElement.clientHeight,
      elemTop = this.el.nativeElement.offsetTop;
    // console.log(document.body.scrollHeight, clientHeight, this.elemTop);
    if (scrollTop + clientHeight - elemTop > 5) {
      this.animFill = 'move';
      this.animLine = this.preAnimLine;
      window.onscroll = null;
    }
  }

}
