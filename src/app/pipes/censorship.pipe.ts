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
@Pipe({name: 'censorship'})
export class CensorshipPipe implements PipeTransform {
  transform(input: string): string {
    return input && input.replace(/傻逼|SB|sb|Sb|sB/g, '真棒');
  }
}
