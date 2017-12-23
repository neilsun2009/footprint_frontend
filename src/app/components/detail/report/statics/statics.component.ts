import { Component, ElementRef, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-statics',
  templateUrl: './statics.component.html',
  styleUrls: ['./statics.component.less'],
  animations: [
    trigger('flyIn', [
      state('true', style({transform: 'scale(1)'})),
      transition(':enter', [
        style({transform: 'scale(0)'}),
        animate('500ms ease-out')
      ])
    ]),
    trigger('player', [
      state('true', style({opacity: 1, transform: 'translateX(0)'})),
      transition(':enter', [
        style({opacity: 0, transform: 'translateX(-500px)'}),
        animate('500ms ease-out')
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({opacity: 0, transform: 'translateX(500px)'}))
      ])
    ])
  ]
})
export class StaticsComponent implements OnInit, OnChanges {

  @Input() homeTeam: any;
  @Input() awayTeam: any;
  @Input() statics: any;
  @Input() primaryColor: any;
  @Input() secondaryColor: any;
  @Input() homeColor: string;
  @Input() awayColor: string;

  groups: any[];

  constructor(
    private el: ElementRef,
  ) { }

  ngOnInit() {
    for (let i = 0, len = this.statics.length; i < len; ++i) {
      if (this.statics[i].period === 'ALL') {
        this.groups = this.statics[i].groups;
        break;
      }
    }
    // console.log(this.groups);
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if (changes['secondaryColor']) {
        let elem = this.el.nativeElement,
          color = changes['secondaryColor'].currentValue,
          fill = elem.getElementsByClassName('statics-container')[0];
        // console.log(fill, line);
        fill.style.backgroundColor = color;
    }
  }

}
