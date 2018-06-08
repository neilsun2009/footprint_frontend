import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,
    RouterStateSnapshot, Route,
    NavigationExtras } from '@angular/router';
import { BgService } from '../../api/bg.service';
import { BgConfigService } from './bg-config.service';

@Injectable()
export class GlobalBgGuard implements CanActivate {

  constructor(
    private bgService: BgService,
    private bgConfigService: BgConfigService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // get logged user data
    // console.log(this.authService);
    return this.bgService.getMultiAsync(0, 0, true).map(
      (data) => {
        let logo = '',
          logoBig = '',
          bgs = [];
        // console.log(data);
        if (data.result) {
          data.data.forEach((elem) => {
            if (elem.name === 'logo') {
              logo = elem.image;
            } else if (elem.name === 'logo-big') {
              logoBig = elem.image;
            } else {
              bgs.push(elem.image);
            }
          });
          if (bgs.length) {
            this.bgConfigService.bgs = bgs;
          } else {
            this.bgConfigService.bgs = ['/assets/bg-1.jpg', '/assets/bg-2.jpg', '/assets/bg-3.jpg', '/assets/bg-4.jpg', '/assets/bg-5.jpg'];
          }
          this.bgConfigService.logo = logo || '/assets/logo.png';
          this.bgConfigService.logoBig = logoBig || '/assets/logo-big.png';
          // console.log(this.bgConfigService);
        }
        return true;
      }
    );
  }

}
