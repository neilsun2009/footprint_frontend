import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'statics'})
export class StaticsPipe implements PipeTransform {
  transform(input: string): string {
    let re = input;
    switch (input) {
      case 'Ball possession':
        re = '控球率';
        break;
      case 'Total shots':
        re = '射门';
        break;
      case 'Shots on target':
        re = '门框范围内';
        break;
      case 'Shots off target':
        re = '门框范围外';
        break;
      case 'Blocked shots':
        re = '射门被封堵';
        break;
      case 'Shots inside box':
        re = '禁区内射门';
        break;
      case 'Shots outside box':
        re = '禁区外射门';
        break;
      case 'Hit woodwork':
        re = '击中立柱';
        break;
      case 'Goalkeeper saves':
        re = '门将扑救';
        break;
      case 'Corner kicks':
        re = '角球';
        break;
      case 'Passes':
        re = '传球';
        break;
      case 'Accurate passes':
        re = '成功传球';
        break;
      case 'Accurate passes %':
        re = '传球成功率';
        break;
      case 'Offsides':
        re = '越位';
        break;
      case 'Fouls':
        re = '犯规';
        break;
      case 'Yellow cards':
        re = '黄牌';
        break;
      case 'Red cards':
        re = '红牌';
        break;
      case 'Duels won':
        re = '1v1成功';
        break;
      case 'Aerials won':
        re = '抢得头球';
        break;
      case 'Counter attacks':
        re = '反击得手';
        break;
      default:
        re = input;
    }
    return re;
  }
}
