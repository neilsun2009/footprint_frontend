import { Component, OnInit, Input, Renderer2, OnDestroy, OnChanges, SimpleChange } from '@angular/core';
import { Match } from '../../../../models/match';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { SofaService } from '../../../../api/sofa.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.less'],
  animations: [
    trigger('loading', [
      state('true', style({opacity: 1, transform: 'translateY(0)'}))
    ]),
    trigger('fadeIn', [
      state('true', style({opacity: 1})),
      transition(':enter', [
        style({opacity: 0}),
        animate('500ms ease-out')
      ]),
      transition('* => true', [
        style({opacity: 0, transform: 'translateY(500px)'}),
        animate('500ms ease-out')
      ])
    ]),
    trigger('scale', [
      state('*', style({transform: 'scale(1) translateY(-50%)'})),
      transition(':enter', [
        style({transform: 'scale(0) translateY(-50%)'}),
        // style({opacity: 0}),
        animate('300ms ease-out')
      ]),
    ]),
    trigger('model', [
      state('true', style({opacity: 1, transform: 'translateY(0)'})),
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(-1000px)'}),
        animate('500ms ease-out')
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({opacity: 0, transform: 'translateY(-1000px)'}))
      ])
    ])
  ]
})
export class ReportComponent implements OnInit {

  @Input() match: Match;
  @Input() primaryColor: string;
  @Input() secondaryColor: string;
  showLoading: boolean;
  noIncidents: boolean;
  noLineup: boolean;
  noStatics: boolean;

  incidents: any[];
  lineup: {
    homeTeam: any;
    awayTeam: any;
  };
  statics: any[];
  passStatics: any[];

  constructor(
    private sofaService: SofaService,
    private renderer: Renderer2
  ) {
    this.showLoading = true;
    this.noIncidents = false;
    this.incidents = null;
    this.noLineup = false;
    this.noStatics = false;
    this.lineup = null;
    this.statics = null;
    this.passStatics = null;
  }

  ngOnInit() {
    // this.primaryColor = this.match.colors[0];
    // this.secondaryColor = this.match.colors[1];
    this.getGeneral(this.match.sofaScoreId);
  }

  getGeneral(sofaScoreId) {
    this.showLoading = true;
    this.noIncidents = false;
    this.noStatics = false;
    this.incidents = null;
    this.statics = null;
    if (!sofaScoreId.length) {
      this.showLoading = false;
      this.noIncidents = true;
      this.noLineup = true;
      this.noStatics = true;
      return;
    }
    this.sofaService.getGeneral(sofaScoreId,
      (data) => {
        // this.showLoading = false;
        if (data.error) {
          this.noIncidents = true;
        } else {
          // incidents
          if (data.incidents.length) {
            this.incidents = data.incidents;
          } else {
            this.noIncidents = true;
          }
          // statics
          if (data.statistics) {
            this.statics = data.statistics.periods;
          } else {
            this.noStatics = true;
          }
        }
        // get lineup
        this.getLineup(sofaScoreId);
      }, (err) => {
        alert(`网络错误：${err.message}`);
        console.log(err);
      });
  }

  getLineup(sofaScoreId) {
    this.showLoading = true;
    this.noLineup = false;
    this.lineup = null;
    this.sofaService.getLineup(sofaScoreId,
      (data) => {
        this.showLoading = false;
        if (data.error) {
          this.noLineup = true;
        } else {
          // lineup
          // console.log(data);
          if (data.homeTeam.hasLineups) {
            this.lineup = data;
          } else {
            this.noLineup = true;
          }
        }
        // pass statics
        this.passStatics = this.statics;
        // console.log(this.passStatics);
      }, (err) => {
        alert(`网络错误：${err.message}`);
        console.log(err);
      });
  }

}
