import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.less']
})
export class BackgroundComponent implements OnInit {

  @Input() bgInput: string;

  get bg(): string {
    return `url(${this.bgInput})`;
  }

  constructor() { }

  ngOnInit() {
  }

}
