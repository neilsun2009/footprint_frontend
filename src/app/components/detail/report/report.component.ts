import { Component, OnInit, Input, Renderer2, OnDestroy } from '@angular/core';
import { Match } from '../../../../models/match';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { SofaService } from '../../../../api/sofa.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.less'],
  animations: [
    trigger('loading', [
      state('true', style({opacity: 1, transform: 'translateY(0)'})),
      // transition('false => true', animate(100)),
      transition(':leave', [
        animate('300ms ease-in', style({opacity: 0}))
      ])
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
export class ReportComponent implements OnInit, OnDestroy {

  @Input() match: Match;
  primaryColor: string;
  secondaryColor: string;
  showLoading: boolean;
  noIncidents: boolean;

  incidents: any[];
  incidentParam: any;

  constructor(
    private sofaService: SofaService,
    private renderer: Renderer2
  ) {
    this.showLoading = true;
    this.noIncidents = false;
    this.incidents = null;
    this.incidentParam = {
      showDouble: true,
      score: '?-?',
      title: '全场比分',
      defaultScore: '?-?',
      team: 0,
      text: ''
    };
  }

  ngOnInit() {
    this.primaryColor = this.match.colors[0];
    this.secondaryColor = this.match.colors[1];
    this.getGeneral(this.match.sofaScoreId);
  }

  ngOnDestroy() {
    window.onresize = null;
  }

  getGeneral(sofaScoreId) {
    this.showLoading = true;
    this.noIncidents = false;
    this.incidents = null;
    if (!sofaScoreId.length) {
      this.showLoading = false;
      this.noIncidents = true;
      return;
    }
    this.sofaService.getGeneral(sofaScoreId,
      (data) => {
        this.showLoading = false;
        // console.log(data);
        if (data.error) {
          this.noIncidents = true;
        } else {
          // incidents
          if (data.incidents.length) {
            this.incidents = data.incidents;
            this.setIncidents(this.incidents);
            window.onresize = () => {
              this.setIncidents(this.incidents);
            };
          } else {
            this.noIncidents = true;
          }
        }
      }, (err) => {
        alert(`网络错误：${err.message}`);
        console.log(err);
      });
  }

  setIncidents(incidents) {
    let bigContainer = document.getElementById('report-incidents'),
      bigCircle = document.getElementById('incidents-big-circle'),
      // containerDefault = angular.element('#incidents-default'),
      // containerDouble = angular.element('#incidents-double'),
      // containerSingle = angular.element('#incidents-single'),
      bigContainerWidth = bigContainer.offsetWidth,
      bigCircleWidth,
      smallCircleWidth = 32,
      smallCircleBorderWidth = 3,
      incidentCount = incidents.length,
      addedTimeFirst = 0,
      addedTimeSecond = 0,
      addedExtraTime = 0,
      addedPenalty = 0,
      penaltyNum = 0,
      minCount = 90,
      minAngle,
      fragment = document.createDocumentFragment(),
      minIncidentCount = [],
      oriTinyCircles = document.getElementsByClassName('tiny-circle'),
      oriSmallCircles = document.getElementsByClassName('small-circle');
    // console.log(bigContainer.offsetWidth);
    bigCircle.style.display = 'block';
    // delete original circles
    // console.log(oriTinyCircles);
    while (oriTinyCircles.item(0)) {
      let node = oriTinyCircles.item(0);
      this.renderer.removeChild(bigContainer, node);
    }
    while (oriSmallCircles.item(0)) {
      let node = oriSmallCircles.item(0);
      this.renderer.removeChild(bigContainer, node);
    }
    // set media query
    if (document.documentElement.offsetWidth <= 500) {
      smallCircleWidth = 16;
    } else if (document.documentElement.offsetWidth <= 800) {
      smallCircleWidth = 24;
    }
    bigCircleWidth = bigContainerWidth - smallCircleWidth * 6;
    // bigCircleCenter = bigContainerWidth/2;
    // set offset
    bigContainer.style.height = bigContainerWidth + 'px';
    bigCircle.style.width = bigCircleWidth + 'px';
    bigCircle.style.height = bigCircleWidth + 'px';
    bigCircle.style.top = (bigContainerWidth - bigCircleWidth) / 2 + 'px';
    bigCircle.style.left = (bigContainerWidth - bigCircleWidth) / 2 + 'px';
    bigCircle.style.borderColor = this.primaryColor;
    bigCircle.addEventListener('click', (e) => {
      this.showIncidentDefaultHandler(e);
    });
    // console.log(bigCircle.innerHeight());
    // containerDefault.style.transform = `translateY(${bigCircleWidth - containerDefault.offset / 2}px)`);
    // containerDouble.css('transform', 'translateY(' + (bigCircleWidth - containerDefault.height())/2 + 'px)');
    // containerSingle.css('transform', 'translateY(' + (bigCircleWidth - containerDefault.height())/2 + 'px)');
    // determine additional time
    for (let i = 0; i < incidentCount; ++i) {
      let incident = incidents[i];
      if (incident.incidentType === 'injuryTime') {
          if (incident.timeSpecial === 45) {
              addedTimeFirst = incident['length'];
          } else if (incident.timeSpecial === 90) {
              addedTimeSecond = incident['length'];
          } else if (incident.timeSpecial === 120) {
              addedExtraTime += incident['length'];
          }
      }
      // extra time
      if (incident.incidentType === 'period' && incident.text[0] === 'E') {
          addedExtraTime += 30;
      }
      // penalty
      if (incident.timeSpecial === '-') {
          addedPenalty++;
      }
    }
    minCount += addedTimeFirst + addedTimeSecond + addedExtraTime + addedPenalty;
    // console.log('count:' + minCount);
    minAngle = 2 * Math.PI / (minCount + 1);
    // draw tiny circle
    if (document.documentElement.offsetWidth > 500) {
        for (let i = 0; i <= minCount; ++i) {
            let circle = this.renderer.createElement('div');
            this.renderer.addClass(circle, 'tiny-circle');
            circle.style.backgroundColor = this.primaryColor;
            circle.style.left = bigContainerWidth / 2 + (Math.sin(minAngle * i) * (bigCircleWidth / 2 + smallCircleWidth / 2)) + 'px';
            circle.style.top = bigContainerWidth / 2 - (Math.cos(minAngle * i) * (bigCircleWidth / 2 + smallCircleWidth / 2)) + 'px';
            if ((i <= 45 && i % 15 === 0) ||
              (i > 45 && i <= 90 + addedTimeFirst && (i - addedTimeFirst) % 15 === 0)) {
                this.renderer.addClass(circle, 'big');
            }
            this.renderer.appendChild(fragment, circle);
            fragment.appendChild(circle);
        }
    }
    // draw incidents
    for (let i = incidentCount - 1; i >= 0; --i) {
        let incident = incidents[i],
          circle = this.renderer.createElement('div');
        // time related
        if (incident.timeSpecial === '-') {
            incident.time = 90 + addedTimeFirst + addedTimeSecond + addedExtraTime + (++penaltyNum);
        } else if (incident.timeSpecial > 45 && incident.timeSpecial <= 90) {
            incident.time = incident.timeSpecial + addedTimeFirst;
        } else if (incident.timeSpecial > 90) {
            incident.time = incident.timeSpecial + addedTimeFirst + addedTimeSecond;
            // console.log(incident.time);
        }
        if (incident.addedTime) {
            if (incident.timeSpecial === 45) {
                incident.time = Math.min(incident.time + incident.addedTime, 45 + addedTimeFirst);
            }
            if (incident.timeSpecial === 90) {
                incident.time = Math.min(incident.time + incident.addedTime, 90 + addedTimeFirst + addedTimeSecond);
            }
            if (incident.timeSpecial === 120) {
                incident.time = Math.min(incident.time + incident.addedTime, 90 + addedTimeFirst + addedTimeSecond + addedExtraTime);
            }
        }
        this.renderer.addClass(circle, 'small-circle');
        circle.style.borderColor = this.primaryColor;
        circle.style.backgroundColor = this.secondaryColor;
        // circle.style.backgroundColor = '#fff';
        circle.style.color = this.primaryColor;
        circle.dataset.index = i + '';
        circle.addEventListener('click', () => {
          this.showIncidentHandler(i);
        });
        circle.addEventListener('mouseenter', () => {
          this.showIncidentHandler(i);
        });
        // circle.addEventListener('mouseleave', showIncidentDefaultHandler);
        switch (incident.incidentType) {
            case 'period':
                circle.innerHTML = '<i class="fa fa-clock-o" aria-hidden="true"></i>';
                if (incident.text[0] === 'H') {
                    incident.time = 45 + addedTimeFirst;
                } else if (incident.text[0] === 'F') {
                    if (incident.text[1] === 'T') {
                        incident.time = 90 + addedTimeFirst + addedTimeSecond;
                        this.incidentParam.defaultScore = incident.text.substring(3).replace(/\s/g, '');
                    } else {
                      this.incidentParam.defaultScore = '?-?';
                    }
                } else if (incident.text[0] === 'E') {
                    incident.time = 90 + addedTimeFirst + addedTimeSecond + addedExtraTime;
                    if (incident.text[1] === 'T') {
                      this.incidentParam.defaultScore = incident.text.substring(3).replace(/\s/g, '');
                    } else {
                      this.incidentParam.defaultScore = '?-?';
                    }
                } else if (incident.text[0] === 'P') {
                    incident.time = 90 + addedTimeFirst + addedTimeSecond + addedExtraTime + addedPenalty;
                    if (incident.text[1] === 'E') {
                      this.incidentParam.defaultScore = incident.text.substring(5).replace(/\s/g, '');
                    } else {
                      this.incidentParam.defaultScore = '?-?';
                    }
                }
                break;
            case 'card':
                circle.innerHTML = '<i class="fa fa-square" aria-hidden="true"></i>';
                if (incident.type === 'Yellow') {
                  // circle.className = 'small-circle yellow';
                  circle.style.color = '#F1C40F';
                } else {
                  // circle.className = 'small-circle red';
                  circle.style.color = '#C0392B';
                }
                break;
            case 'substitution':
                circle.innerHTML = '<i class="fa fa-retweet" aria-hidden="true"></i>';
                break;
            case 'injuryTime':
                circle.innerHTML = '<i class="fa fa-plus" aria-hidden="true"></i>';
                break;
            case 'goal':
                circle.innerHTML = '<i class="fa fa-soccer-ball-o" aria-hidden="true"></i>';
                break;
            case 'penalty':
                circle.innerHTML = '<i class="fa fa-soccer-ball-o" aria-hidden="true"></i>';
                // circle.className = 'small-circle red';
                circle.style.color = '#C0392B';
                break;
            default:
                circle.innerHTML = '<i class="fa fa-question" aria-hidden="true"></i>';
                break;
        }
        if (this.incidentParam.showDouble && this.incidentParam.title === '全场比分') {
          this.incidentParam.score = this.incidentParam.defaultScore;
        }
        if (minIncidentCount.length < incident.time + 1) {
            minIncidentCount.length = incident.time + 1;
            minIncidentCount[incident.time] = 0;
        }
        circle.style.left = bigContainerWidth / 2 + (Math.sin(minAngle * incident.time) *
          (bigCircleWidth / 2 + smallCircleWidth / 2 + minIncidentCount[incident.time] * smallCircleWidth))
          - smallCircleWidth / 2 - smallCircleBorderWidth + 'px';
        circle.style.top = bigContainerWidth / 2 - (Math.cos(minAngle * incident.time) *
          (bigCircleWidth / 2 + smallCircleWidth / 2 + minIncidentCount[incident.time] * smallCircleWidth))
          - smallCircleWidth / 2 - smallCircleBorderWidth + 'px';
        minIncidentCount[incident.time]++;
        fragment.appendChild(circle);
    }
    this.renderer.appendChild(bigContainer, fragment);
    // document.getElementById('report-incidents').appendChild(fragment);
  }

  // event handler to show default in big circle
  showIncidentDefaultHandler(e) {
    let param = this.incidentParam;
    param.showDouble = true;
    param.title = '全场比分';
    param.score = param.defaultScore;
  }

  showIncidentHandler(index) {
    // console.log(index);
    let param = this.incidentParam,
      incident = this.incidents[index],
      time = '',
      title = '',
      text1 = '',
      text2 = '',
      team = 0;
    if (incident.addedTime) {
        time = incident.timeSpecial + '+' + incident.addedTime + '\'';
    } else {
        if (incident.timeSpecial === '-') {
            time = '点球大战';
        } else {
            time = incident.timeSpecial + '\'';
        }
    }
    // console.log(target);
    switch (incident.incidentType) {
        case 'period':
            if (incident.text[0] === 'H') {
                title = '上半场结束';
                text1 = incident.text.substring(3).replace(/\s/g, '');
            } else if (incident.text[0] === 'F') {
                // first half not finished
                if (incident.text[1] === 'i') {
                    title = '上半场进行中';
                    // text1 = incident.text.substring(3).replace(/\s/g, '');
                } else {
                    // second half finished
                    title = '下半场结束';
                    text1 = incident.text.substring(3).replace(/\s/g, '');
                }

            } else if (incident.text[0] === 'E') {
                // not finished
                if (incident.text[1] === 'x') {
                    title = '加时赛进行中';
                } else {
                    title = '加时赛结束';
                    text1 = incident.text.substring(3).replace(/\s/g, '');
                }
            } else if (incident.text[0] === 'P') {
                if (incident.text[1] === 'e') {
                    title = '点球大战进行中';
                } else {
                    title = '点球大战结束';
                    text1 = incident.text.substring(5).replace(/\s/g, '');
                }
            } else {
                title = incident.text;
                switch (title) {
                    case 'First half':
                        title = '上半场进行中';
                        break;
                    case 'Second half':
                        title = '下半场进行中';
                        break;
                    default:
                        break;
                }
            }
            break;
        case 'card':
            if (incident.type === 'Yellow') {
                title = '黄牌';
            } else if (incident.type === 'YellowRed') {
                title = '两黄变一红';
            } else if (incident.type === 'Red') {
                title = '红牌';
            } else {
                title = incident.type;
            }
            title = time + ' ' + title;
            // console.log(incident.isHome);
            team = Number(!incident.isHome);
            if (incident.player) {
                text1 = incident.player.name;
            } else {
                text1 = 'John Doe';
            }
            text2 = incident.reason || '';
            switch (text2) {
                case 'Foul':
                    text2 = '犯规';
                    break;
                case 'Argument':
                    text2 = '争执';
                    break;
                case 'Time wasting':
                    text2 = '拖延时间';
                    break;
                case 'Off the ball foul':
                    text2 = '无球犯规';
                    break;
                case 'Violent conduct':
                    text2 = '暴力动作';
                    break;
                case 'Handball':
                    text2 = '手球';
                    break;
                default:
                    break;
            }
            break;
        case 'substitution':
            title = '换人';
            title = time + ' ' + title;
            team = +incident.isHome;
            if (incident.playerIn) {
                text1 = incident.playerIn.name;
            } else {
                text1 = 'John Doe';
            }
            text2 = '换下 ' + incident.playerOut.name;
            break;
        case 'injuryTime':
            title = '伤停补时';
            text1 = incident['length'] + '\'';
            break;
        case 'goal':
            title = '进球';
            title = time + ' ' + title;
            team = Number(!incident.isHome);
            if (incident.player) {
                text1 = incident.player.name;
            } else {
                text1 = 'John Doe';
            }

            if (incident.assist1) {
                text2 = incident.assist1.name + ' 助攻 ';
            }
            if (incident.from) {
                switch (incident.from) {
                    case 'penalty':
                        text2 += '点球破门';
                        break;
                    case 'heading':
                        text2 += '头球破门';
                        break;
                    case 'owngoal':
                        text2 += '乌龙球';
                        break;
                    default:
                        text2 += incident.from;
                        break;
                }
            }
            break;
        case 'penalty':
            title = '射失点球';
            title = time + ' ' + title;
            team = Number(!incident.isHome);
            if (incident.player) {
                text1 = incident.player.name;
            } else {
                text1 = 'John Doe';
            }
            break;
        default:
            title = '???';
            break;
    }
    // console.log('team:' + team);
    if (incident.incidentType === 'period' || incident.incidentType === 'injuryTime') {
        param.showDouble = true;
        param.title = title;
        param.score = text1;
    } else {
      param.showDouble = false;
      param.title = title;
      param.score = text1;
      param.text = text2;
      // console.log(team);
      param.team = team;
    }
  }

}
