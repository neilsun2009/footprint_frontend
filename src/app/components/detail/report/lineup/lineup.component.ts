import { Component, OnInit, Input, Renderer2, OnDestroy, OnChanges, SimpleChange } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-lineup',
  templateUrl: './lineup.component.html',
  styleUrls: ['./lineup.component.less'],
  animations: [
    trigger('flyIn', [
      state('true', style({transform: 'translateY(0)'})),
      transition(':enter', [
        style({transform: 'translateY(500px)'}),
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
export class LineupComponent implements OnInit {

  @Input() team: any;
  @Input() lineup: any;
  color: any;
  gkColor: any;
  players: any[];
  outPlayers: any[];
  showPlayer: boolean;
  playerLock: boolean;

  constructor(
    // private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.color = this.lineup.color.player;
    this.color.outline = '#' + this.color.outline;
    this.color.number = '#' + this.color.number;
    this.gkColor = this.lineup.color.goalkeeper;
    this.gkColor.outline = '#' + this.gkColor.outline;
    this.gkColor.number = '#' + this.gkColor.number;
    // init players
    this.players = [{player: {name: this.lineup.manager ? this.lineup.manager.name : 'Unknown'}, shirtNumber: 'M'}];
    this.players = this.players.concat(this.lineup.lineupsSorted);
    this.outPlayers = [];
    this.showPlayer = false;
    this.playerLock = false;
    // incidents
    if (this.lineup.incidents) {
      for (let index in this.lineup.incidents) {
        if (this.lineup.incidents.hasOwnProperty(index)) {
          let incidents = this.lineup.incidents[index];
          for (let i = 0, len = incidents.length; i < len; ++i) {
            let incident = incidents[i];
            // console.log(incident);
            switch (incident.incidentType) {
              case 'substitution':
                this.addPlayerAttrNum(incident.playerIn.id, 'subins', incident);
                this.addPlayerAttrNum(incident.playerOut.id, 'subouts', incident);
                break;
              case 'card':
                if (incident.type === 'Yellow') {
                  this.addPlayerAttrNum(incident.player.id, 'yellows', incident);
                } else {
                  this.addPlayerAttrNum(incident.player.id, 'reds', incident);
                }
                break;
              case 'goal':
                this.addPlayerAttrNum(incident.player.id, 'goals', incident);
                if (incident.assist1) {
                  this.addPlayerAttrNum(incident.assist1.id, 'assists', incident);
                }
                break;
            }
          }
        }
      }
    }
  }

  addPlayerAttrNum(id, attr, incident) {
    let index = 0, player;
    // start from 1, as 0 is always coach
    for (let i = 1, len = this.players.length; i < len; ++i) {
      if (this.players[i].player.id === id) {
        index = i;
        break;
      }
    }
    if (index) {
      player = this.players[index];
      player[attr] ? player[attr].push(incident) : player[attr] = [incident];
      // console.log(player);
    }
  }

  syncAddPlayer(data, index) {
    if (index === data.length) {
      this.playerLock = false;
      this.showPlayer = true;
      return;
    }
    this.outPlayers.push(data[index]);
    setTimeout(() => {
      this.syncAddPlayer(data, index + 1);
    }, 50);
  }

  syncDeletePlayer() {
    if (!this.outPlayers.length) {
      this.playerLock = false;
      this.showPlayer = false;
      return;
    }
    this.outPlayers.pop();
    setTimeout(() => {
      this.syncDeletePlayer();
    }, 25);
  }

  togglePlayers() {
    if (this.playerLock) {
      return;
    }
    this.playerLock = true;
    if (this.showPlayer) {
      this.syncDeletePlayer();
    } else {
      this.syncAddPlayer(this.players, 0);
    }
  }

}
