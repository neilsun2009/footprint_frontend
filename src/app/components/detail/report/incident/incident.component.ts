import { Component, OnInit, Input, Renderer2, OnDestroy, OnChanges, SimpleChange } from '@angular/core';
import { Match } from '../../../../../models/match';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.less'],
  animations: [
    trigger('fadeIn', [
      state('true', style({transform: 'scale(1)'})),
      transition(':enter', [
        style({transform: 'scale(0)'}),
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
      transition('* => void', [
        // style({transform: 'scale(0) translateY(-50%)'}),
        // style({opacity: 0}),
        animate(0)
      ]),
      transition('* => *', [
        style({transform: 'scale(0.5) translateY(-50%)'}),
        // style({opacity: 0}),
        animate('300ms ease-out')
      ])
    ])
  ]
})
export class IncidentComponent implements OnInit, OnDestroy, OnChanges {

  @Input() match: Match;
  @Input() primaryColor: string;
  @Input() secondaryColor: string;

  @Input() incidents: any[];
  incidentParam: any;

  constructor(
    private renderer: Renderer2
  ) {
  }

  ngOnInit() {
    // this.incidents = null;
    this.incidentParam = {
        showDouble: true,
        score: '?-?',
        title: '全场比分',
        defaultScore: `${this.match.teams[0].score === -1 ? '?' : this.match.teams[0].score}-`
            + `${this.match.teams[1].score === -1 ? '?' : this.match.teams[1].score}`,
        team: 0,
        text: '',
        minCount: 90,
        minAngle: 0
    };
    this.setIncidents(this.incidents);
    window.onresize = () => {
      this.resize();
      // this.setIncidents(this.incidents);
    };
  }

  ngOnDestroy() {
    window.onresize = null;
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if (changes['primaryColor']) {
        let tinyCircles = document.getElementsByClassName('tiny-circle'),
            smallCircles = document.getElementsByClassName('small-circle'),
            primaryColor = changes.primaryColor.currentValue,
            secondaryColor = changes.secondaryColor.currentValue;
        // console.log(changes);
        // tiny circle
        for (let i = 0, len = tinyCircles.length; i < len; ++i) {
            let circle = <HTMLElement>tinyCircles.item(i);
            circle.style.backgroundColor = primaryColor;
        }
        // small circle
        for (let i = 0, len = smallCircles.length; i < len; ++i) {
            let circle = <HTMLElement>smallCircles.item(i);
            circle.style.backgroundColor = secondaryColor;
            circle.style.borderColor = primaryColor;
            if (circle.style.color !== 'rgb(192, 57, 43)' && circle.style.color !== 'rgb(241, 196, 15)') {
                circle.style.color = primaryColor;
            }
        }
    }
  }

  resize() {
    let bigContainer = document.getElementById('report-incidents'),
        bigCircle = document.getElementById('incidents-big-circle'),
        // containerDefault = angular.element('#incidents-default'),
        // containerDouble = angular.element('#incidents-double'),
        // containerSingle = angular.element('#incidents-single'),
        bigContainerWidth = bigContainer.offsetWidth,
        bigContainerHeight = bigContainerWidth,
        bigCircleWidth,
        smallCircleWidth = 32,
        smallCircleBorderWidth = 3,
        tinyCircles = document.getElementsByClassName('tiny-circle'),
        smallCircles = document.getElementsByClassName('small-circle');
    if (document.documentElement.offsetWidth <= 500) {
        smallCircleWidth = 16;
    } else if (document.documentElement.offsetWidth <= 800) {
        smallCircleWidth = 24;
    }
    bigCircleWidth = bigContainerWidth - smallCircleWidth * 6;
    // bigCircleCenter = bigContainerWidth/2;
    // set offset
    // bigContainer.style.height = bigContainerWidth + 'px';
    bigCircle.style.width = bigCircleWidth + 'px';
    bigCircle.style.height = bigCircleWidth + 'px';
    bigCircle.style.top = (bigContainerWidth - bigCircleWidth) / 2 + 'px';
    bigCircle.style.left = (bigContainerWidth - bigCircleWidth) / 2 + 'px';
    // tiny circle
    for (let i = 0, len = tinyCircles.length; i < len; ++i) {
        let circle = tinyCircles.item(i);
        this.renderer.setStyle(circle, 'left', bigContainerWidth / 2 + (Math.sin(this.incidentParam.minAngle * i)
            * (bigCircleWidth / 2 + smallCircleWidth / 2)) + 'px');
        this.renderer.setStyle(circle, 'top', bigContainerWidth / 2 - (Math.cos(this.incidentParam.minAngle * i)
            * (bigCircleWidth / 2 + smallCircleWidth / 2)) + 'px');
        if (document.documentElement.offsetWidth <= 500) {
            this.renderer.setStyle(circle, 'display', 'none');
        } else {
            this.renderer.setStyle(circle, 'display', 'block');
        }
        // circle.style.left = bigContainerWidth / 2 + (Math.sin(this.incidentParam.minAngle * i)
        //     * (bigCircleWidth / 2 + smallCircleWidth / 2)) + 'px';
        // circle.style.top = bigContainerWidth / 2 - (Math.cos(this.incidentParam.minAngle * i)
        //     * (bigCircleWidth / 2 + smallCircleWidth / 2)) + 'px';
    }
    // small circle
    for (let len = this.incidents.length, i = len - 1; i >= 0; --i) {
        let incident = this.incidents[i],
          circle = <HTMLElement>smallCircles.item(len - i - 1),
          minIncidentCount = +circle.dataset.minIncidentCount,
          left, top;
        if (this.incidentParam.showDouble && this.incidentParam.title === '全场比分') {
          this.incidentParam.score = this.incidentParam.defaultScore;
        }
        left = bigContainerWidth / 2 + (Math.sin(this.incidentParam.minAngle * incident.time) *
            (bigCircleWidth / 2 + smallCircleWidth / 2 + minIncidentCount * smallCircleWidth))
            - smallCircleWidth / 2 - smallCircleBorderWidth;
        this.renderer.setStyle(circle, 'left', left + 'px');
        top =  bigContainerWidth / 2 - (Math.cos(this.incidentParam.minAngle * incident.time) *
            (bigCircleWidth / 2 + smallCircleWidth / 2 + minIncidentCount * smallCircleWidth))
            - smallCircleWidth / 2 - smallCircleBorderWidth;
        this.renderer.setStyle(circle, 'top', top + 'px');
        bigContainerHeight = Math.max(bigContainerHeight, top + smallCircleWidth);
    }
    bigContainer.style.height = bigContainerHeight + 'px';
  }

  setIncidents(incidents) {
    let bigContainer = document.getElementById('report-incidents'),
      bigCircle = document.getElementById('incidents-big-circle'),
      // containerDefault = angular.element('#incidents-default'),
      // containerDouble = angular.element('#incidents-double'),
      // containerSingle = angular.element('#incidents-single'),
      bigContainerWidth = bigContainer.offsetWidth,
      bigContainerHeight = bigContainerWidth,
      bigCircleWidth,
      smallCircleWidth = 32,
      smallCircleBorderWidth = 3,
      incidentCount = incidents.length,
      addedTimeFirst = 0,
      addedTimeSecond = 0,
      addedExtraTime = 0,
      addedPenalty = 0,
      penaltyNum = 0,
      fragment = document.createDocumentFragment(),
      minIncidentCount = [],
      oriTinyCircles = document.getElementsByClassName('tiny-circle'),
      oriSmallCircles = document.getElementsByClassName('small-circle');
    // console.log(bigContainer.offsetWidth);
    bigCircle.style.display = 'block';
    // delete original circles
    // console.log(oriTinyCircles);
    /*while (oriTinyCircles.item(0)) {
      let node = oriTinyCircles.item(0);
      this.renderer.removeChild(bigContainer, node);
    }
    while (oriSmallCircles.item(0)) {
      let node = oriSmallCircles.item(0);
      this.renderer.removeChild(bigContainer, node);
    }*/
    // set media query
    if (document.documentElement.offsetWidth <= 500) {
      smallCircleWidth = 16;
    } else if (document.documentElement.offsetWidth <= 800) {
      smallCircleWidth = 24;
    }
    bigCircleWidth = bigContainerWidth - smallCircleWidth * 6;
    // bigCircleCenter = bigContainerWidth/2;
    // set offset
    // bigContainer.style.height = bigContainerWidth + 'px';
    bigCircle.style.width = bigCircleWidth + 'px';
    bigCircle.style.height = bigCircleWidth + 'px';
    bigCircle.style.top = (bigContainerWidth - bigCircleWidth) / 2 + 'px';
    bigCircle.style.left = (bigContainerWidth - bigCircleWidth) / 2 + 'px';
    this.renderer.setProperty(bigCircle, '[style.border-color]', 'primaryColor');
    // bigCircle.style.borderColor = this.primaryColor;
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
          } else if (incident.timeSpecial === 120 || incident.timeSpecial === 105) {
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
    this.incidentParam.minCount += addedTimeFirst + addedTimeSecond + addedExtraTime + addedPenalty;
    // console.log('count:' + minCount);
    this.incidentParam.minAngle = 2 * Math.PI / (this.incidentParam.minCount + 1);
    // draw tiny circle
    // if (document.documentElement.offsetWidth > 500) {
    for (let i = 0; i <= this.incidentParam.minCount; ++i) {
        let circle = this.renderer.createElement('div');
        this.renderer.addClass(circle, 'tiny-circle');
        circle.style.backgroundColor = this.primaryColor;
        circle.style.left = bigContainerWidth / 2 + (Math.sin(this.incidentParam.minAngle * i)
            * (bigCircleWidth / 2 + smallCircleWidth / 2)) + 'px';
        circle.style.top = bigContainerWidth / 2 - (Math.cos(this.incidentParam.minAngle * i)
            * (bigCircleWidth / 2 + smallCircleWidth / 2)) + 'px';
        if ((i <= 45 && i % 15 === 0) ||
            (i > 45 && i <= 90 + addedTimeFirst && (i - addedTimeFirst) % 15 === 0)) {
            this.renderer.addClass(circle, 'big');
        }
        if (document.documentElement.offsetWidth <= 500) {
            circle.style.display = 'none';
        }
        this.renderer.appendChild(fragment, circle);
        // this.renderer.appendChild(bigContainer, circle);
        // fragment.appendChild(circle);
    // this.renderer.appendChild(bigContainer, fragment);
        // this.renderer.setProperty(circle, '[style.background-color]', 'primaryColor');
    }
    // }
    // draw incidents
    for (let i = incidentCount - 1; i >= 0; --i) {
        let incident = incidents[i],
          circle = this.renderer.createElement('div'),
          top = 0, left = 0;
        // time related
        if (incident.timeSpecial === '-') {
            incident.time = 90 + addedTimeFirst + addedTimeSecond + addedExtraTime + (++penaltyNum);
        } else if (incident.timeSpecial > 45 && incident.timeSpecial <= 90) {
            incident.time = incident.timeSpecial + addedTimeFirst;
        } else if (incident.timeSpecial > 90 && incident.timeSpecial <= 120) {
            incident.time = incident.timeSpecial + addedTimeFirst + addedTimeSecond;
            // console.log(incident.time);
        } else if (incident.timeSpecial > 120) {
            incident.time = 90 + addedTimeFirst + addedTimeSecond + addedExtraTime;
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
        // this.renderer.setProperty(circle, '[style.border-color]', 'primaryColor');
        // this.renderer.setProperty(circle, '[style.background-color]', 'secondaryColor');
        // this.renderer.setProperty(circle, '[style.color]', 'primaryColor');
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
                } else {
                    incident.time = 90 + addedTimeFirst + addedTimeSecond + addedExtraTime + addedPenalty;
                }
                break;
            case 'card':
                circle.innerHTML = '<i class="fa fa-square" aria-hidden="true"></i>';
                if (incident.type === 'Yellow') {
                  // circle.className = 'small-circle yellow';
                  circle.style.color = '#F1C40F';
                } else {
                  // circle.className = 'small-circle red';
                  circle.style.color = '#E74C3C';
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
                circle.style.color = '#E74C3C';
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
        } else if (!minIncidentCount[incident.time]) {
            minIncidentCount[incident.time] = 0;
        }
        left = bigContainerWidth / 2 + (Math.sin(this.incidentParam.minAngle * incident.time) *
          (bigCircleWidth / 2 + smallCircleWidth / 2 + minIncidentCount[incident.time] * smallCircleWidth))
          - smallCircleWidth / 2 - smallCircleBorderWidth;
        top = bigContainerWidth / 2 - (Math.cos(this.incidentParam.minAngle * incident.time) *
          (bigCircleWidth / 2 + smallCircleWidth / 2 + minIncidentCount[incident.time] * smallCircleWidth))
          - smallCircleWidth / 2 - smallCircleBorderWidth;
        circle.style.left = left + 'px';
        circle.style.top = top + 'px';
        circle.dataset.minIncidentCount = minIncidentCount[incident.time];
        minIncidentCount[incident.time]++;
        // console.log(left, top, incident.time);
        bigContainerHeight = Math.max(bigContainerHeight, top + smallCircleWidth);
        // co7insole.log(bigContainer.style.height);
        fragment.appendChild(circle);
        // console.log(incident);
    }
    bigContainer.style.height = bigContainerHeight + 'px';
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
            title = incident.injury ? '因伤换人' : '换人';
            title = time + ' ' + title;
            team = +!incident.isHome;
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
