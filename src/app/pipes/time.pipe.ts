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
@Pipe({name: 'time'})
export class TimePipe implements PipeTransform {
  transform(input: number): string {
    const days = Math.floor(input / (1000 * 60 * 60 * 24)),
      hours = Math.floor(input % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
      minutes = Math.floor(input % (1000 * 60 * 60) / (1000 * 60)),
      seconds = Math.floor(input % (1000 * 60) / (1000));
    return `${days}天${hours}时${minutes}分${seconds}秒`;
  }
}
