import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { User } from '../../../../models/user';
import { Match } from '../../../../models/match';
import { Field } from '../../../../models/field';
import { Router } from '@angular/router';
import { FieldService } from '../../../../api/field.service';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.less'],
  animations: [
    trigger('loading', [
      state('true', style({opacity: 1})),
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
      ])
    ]),
    trigger('field', [
      state('*', style({opacity: 1, transform: 'scaleX(1)'})),
      transition(':enter', [
        style({transform: 'scaleX(0)', opacity: 0}),
        animate('500ms ease-out')
      ])
    ]),
    trigger('scale', [
      state('true', style({transform: 'scale(1)'})),
      transition(':enter', [
        style({transform: 'scale(0)'}),
        animate('300ms 300ms ease-out')
      ])
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
export class FieldComponent implements OnInit {

  @Input() match: Match;
  @Input() user: User;
  field: Field;

  primaryColor: string;
  secondaryColor: string;

  showAddModel: boolean;
  showUpdateModel: boolean;
  showDeleteModel: boolean;

  addParam: {
    matchid: string;
    price: string;
    seat: string;
    companion: string;
  };

  updateParam: {
    fieldid: string;
    price: string;
    seat: string;
    companion: string;
  };

  canvas: HTMLCanvasElement;

  constructor(
    private router: Router,
    private fieldService: FieldService
  ) {
    this.field = null;
    this.showAddModel = false;
    this.showUpdateModel = false;
    this.showDeleteModel = false;
  }

  ngOnInit() {
    this.primaryColor = this.match.colors[0];
    this.secondaryColor = this.match.colors[1];
    this.field = <Field>this.match._fields[0];
    this.addParam = {
      matchid: this.match._id,
      price: '',
      seat: '',
      companion: ''
    };
    this.canvas = <HTMLCanvasElement>document.getElementById('field-canvas');
    if (this.field) {
      this.updateParam = {
        fieldid: this.field._id,
        price: this.field.price,
        seat: this.field.seat,
        companion: this.field.companion
      };
      this.drawField(this.canvas, this.field, this.match);
    }
  }

  drawField(canvas: HTMLCanvasElement, field: Field, match: Match) {
    function getTextLength(text, size) {
      return text.length * size;
    }
    function datePadding(num) {
      if (num < 10) {
        return '0' + num;
      } else {
        return num;
      }
    }
    let context, imgTeam1 = new Image(), imgTeam2 = new Image(),
        imgTournament = new Image(), imgWaterprint = new Image(),
        bgString, startTime = new Date(match.startTime),
        competition = match.competition;
    if (canvas.getContext) {
        context = canvas.getContext('2d');
        // set background
        if (/中超联赛/.test(competition)) {
            if (+competition.substr(0, 4) >= 2017) {
                context.fillStyle = '#183467';
                bgString = 'rgba(24,52,103,0.9)';
            } else {
                context.fillStyle = 'rgba(243,156,18,1.0)';
                bgString = 'rgba(243,156,18,0.9)';
            }
        } else if (/中国足协杯/.test(competition)) {
            if (/^决赛/.test(match.round)) {
                context.fillStyle = 'rgba(243,156,18,1.0)';
                bgString = 'rgba(243,156,18,0.9)';
            } else {
                context.fillStyle = '#2980B9';
                bgString = 'rgba(41,128,185,0.9)';
            }
        } else if (/亚冠联赛/.test(competition)) {
            context.fillStyle = '#8F2824';
            bgString = 'rgba(143,40,36,0.9)';
        } else if (/2016欧洲杯/.test(competition)) {
            context.fillStyle = '#183467';
            bgString = 'rgba(24,52,103,0.9)';
        } else {
            context.fillStyle = '#ECF0F1';
            bgString = 'rgba(236,240,241,0.9)';
        }
        context.fillRect(0, 0, 800, 300);
        // set team logos, as well as other pics
        imgTeam1.src = match.teams[0].logo;
        imgTeam1.onload = function() {
            context.drawImage(imgTeam1, -200, -100, 500, 500);
            context.fillStyle = bgString;
            context.fillRect(0, 0, 300, 300);
            // waterfall setting imgteam2
            imgTeam2.src = match.teams[1].logo;
        };
        imgTeam2.onload = function() {
            context.drawImage(imgTeam2, 500, -100, 500, 500);
            context.fillStyle = bgString;
            context.fillRect(500, 0, 300, 300);
            // set line
            context.fillStyle = 'rgba(255,255,255,0.25)';
            context.fillRect(599, 0, 2, 300);
            // waterfall setting tournament logo
            // also prepare for text color
            if (/中超联赛/.test(competition)) {
                imgTournament.src = 'http://olxpdoc6c.bkt.clouddn.com/footprint/ticket-tounament/csl.png';
                context.fillStyle = '#FFFFFF';
            } else if (/中国足协杯/.test(competition)) {
                imgTournament.src = 'http://olxpdoc6c.bkt.clouddn.com/footprint/ticket-tounament/cfa-cup.png';
                context.fillStyle = '#FFFFFF';
            } else if (/亚冠联赛/.test(competition)) {
                imgTournament.src = 'http://olxpdoc6c.bkt.clouddn.com/footprint/ticket-tounament/afc-champions-league.png';
                context.fillStyle = '#FFFFFF';
            } else if (/英格兰联赛杯/.test(competition)) {
                imgTournament.src = 'http://olxpdoc6c.bkt.clouddn.com/footprint/ticket-tounament/EFL-cup.png';
                context.fillStyle = '#000000';
            } else if (/英冠联赛/.test(competition)) {
                imgTournament.src = 'http://olxpdoc6c.bkt.clouddn.com/footprint/ticket-tounament/EFL-championship.png';
                context.fillStyle = '#000000';
            } else if (/2016欧洲杯/.test(competition)) {
                imgTournament.src = 'http://olxpdoc6c.bkt.clouddn.com/footprint/ticket-tounament/uefa-uero-2016.png';
                context.fillStyle = '#FFFFFF';
            } else {
                imgTournament.src = 'http://olxpdoc6c.bkt.clouddn.com/footprint/ticket-tounament/fairplay.png';
                context.fillStyle = '#000000';
            }
            // waterfall setting waterprint
            imgWaterprint.src = '../assets/ticket-waterprint.png';
        };
        imgTournament.onload = function() {
            context.drawImage(imgTournament, 250, 0, 300, 300);
            // write normal text
            context.font = '20px "Microsoft YaHei UI"';
            context.textBaseline = 'hanging';
            context.fillText(competition, 15, 24);
            context.fillText('V', 15, 102);
            context.fillText(match.stadium, 15, 180);
            context.fillText('球友', 15, 218);
            context.fillText('年', 90, 256);
            context.fillText('月', 170, 256);
            context.fillText('日', 250, 256);
            context.fillText(':', 330, 256);
            // write price text
            context.save();
            context.font = '90px "Microsoft YaHei UI"';
            context.rotate(Math.PI / 2);
            context.textAlign = 'center';
            context.fillText(field.price, 150, -745, 260);
            context.restore();
            // draw rectangles
            context.fillStyle = '#FFFFFF';
            context.fillRect(getTextLength(competition, 20), 20,
                getTextLength(match.round, 20) + 20, 28);
            context.fillRect(15, 58, getTextLength(match.teams[0].teamName, 25) + 20, 40);
            context.fillRect(15, 126, getTextLength(match.teams[1].teamName, 25) + 20, 40);
            context.fillRect(15 + getTextLength(match.stadium, 20) + 10, 176,
                getTextLength(field.seat, 20) + 20, 28);
            context.fillRect(65, 214, getTextLength(field.companion, 20) + 20, 28);
            context.fillRect(15, 252, 65, 28);
            context.fillRect(120, 252, 40, 28);
            context.fillRect(200, 252, 40, 28);
            context.fillRect(280, 252, 40, 28);
            context.fillRect(350, 252, 40, 28);
            // write highlighted text
            context.fillStyle = '#000000';
            context.fillText(match.round, getTextLength(competition, 20) + 10, 24);
            context.save();
            context.font = '25px "Microsoft YaHei UI"';
            context.fillText(match.teams[0].teamName, 25, 65);
            context.fillText(match.teams[1].teamName, 25, 133);
            context.restore();
            context.fillText(field.seat, 15 + getTextLength(match.stadium, 20) + 20, 180);
            context.fillText(field.companion, 75, 218);
            context.save();
            context.textAlign = 'center';
            context.fillText(startTime.getFullYear(), 47, 256);
            context.fillText(startTime.getMonth() + 1, 140, 256);
            context.fillText(startTime.getDate(), 220, 256);
            context.fillText(datePadding(startTime.getHours()), 300, 256);
            context.fillText(datePadding(startTime.getMinutes()), 370, 256);
            context.restore();
        };
        imgWaterprint.onload = function() {
            context.drawImage(imgWaterprint, 519, 195);
        };
    }
  }

  errorHandler(err) {
    if (err.message === 'login required') {
      alert('请先登录');
      window.open('/login');
    } else {
      alert(`网络错误：${err.message}`);
      console.log(err);
    }
  }

  addField() {
    if (!this.user) {
      alert('请先登录');
      this.router.navigate(['/login']);
      return;
    }
    this.fieldService.add(this.addParam,
    (data) => {
      if (data.result) {
        this.showAddModel = false;
        this.field = data.data;
        this.updateParam = {
          fieldid: this.field._id,
          price: this.field.price,
          seat: this.field.seat,
          companion: this.field.companion
        };
        this.drawField(this.canvas, this.field, this.match);
      } else {
        if (data.message === 'login required') {
          alert('请先登录');
          window.open('/login');
        } else {
          this.errorHandler(data);
        }
      }
    }, this.errorHandler);
  }

  updateField() {
    if (!this.user) {
      alert('请先登录');
      this.router.navigate(['/login']);
      return;
    }
    this.fieldService.update(this.updateParam,
    (data) => {
      if (data.result) {
        this.showUpdateModel = false;
        this.field.price = this.updateParam.price;
        this.field.seat = this.updateParam.seat;
        this.field.companion = this.updateParam.companion;
        this.drawField(this.canvas, this.field, this.match);
      } else {
        if (data.message === 'login required') {
          alert('请先登录');
          window.open('/login');
        } else {
          this.errorHandler(data);
        }
      }
    }, this.errorHandler);
  }

  deleteField() {
    if (!this.user) {
      alert('请先登录');
      this.router.navigate(['/login']);
      return;
    }
    this.fieldService.delete({fieldid: this.field._id},
    (data) => {
      if (data.result) {
        this.showDeleteModel = false;
        this.field = null;
      } else {
        if (data.message === 'login required') {
          alert('请先登录');
          window.open('/login');
        } else {
          this.errorHandler(data);
        }
      }
    }, this.errorHandler);
  }

}
