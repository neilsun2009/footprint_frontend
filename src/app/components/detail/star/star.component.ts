import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange  } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.less']
})
export class StarComponent implements OnInit, OnChanges {

  @Input() star: number;
  @Input() edit: boolean;
  @Output() onChange = new EventEmitter<number>();
  classes: {
    'fa': boolean;
    'fa-star': boolean;
    'fa-star-o': boolean;
    'fa-star-half-o': boolean;
  }[];

  constructor() {
    this.classes = [];
    for (let i = 0; i < 5; ++i) {
      this.classes.push({
        'fa': true,
        'fa-star': false,
        'fa-star-o': true,
        'fa-star-half-o': false
      });
    }
  }

  ngOnInit() {
    this.setNumber(this.star);
  }

  ngOnChanges() {
    this.setNumber(this.star);
  }

  private calcStar(e, newStar): number {
    const { target, clientX } = e;
    const { offsetWidth, offsetLeft } = target;
    const diff = clientX - offsetLeft;
    if (diff > 5) {
      if (diff < offsetWidth / 2) {
        newStar += 0.5;
      } else {
        newStar += 1;
      }
    }
    return newStar;
  }

  onMouseMove(e, newStar) {
    this.setNumber(this.calcStar(e, newStar));
  }

  onMouseLeave() {
    this.setNumber(this.star);
  }

  onClick(e, newStar) {
    this.star = this.calcStar(e, newStar);
    this.onChange.emit(this.star);
  }

  setNumber(star) {
    const floor = Math.floor(star);
    let i = 0;
    for (i = 0; i < floor; ++i) {
      this.classes[i]['fa-star-o'] = false;
      this.classes[i]['fa-star-half-o'] = false;
      this.classes[i]['fa-star'] = true;
    }
    if ((star * 10) % 10 === 5) {
      this.classes[i]['fa-star-o'] = false;
      this.classes[i]['fa-star-half-o'] = true;
      this.classes[i++]['fa-star'] = false;
    }
    for (i; i < 5; ++i) {
      this.classes[i]['fa-star-o'] = true;
      this.classes[i]['fa-star-half-o'] = false;
      this.classes[i]['fa-star'] = false;
    }
  }
}
