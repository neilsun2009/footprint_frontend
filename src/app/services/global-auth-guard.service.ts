import { Injectable } from '@angular/core';
import { CanActivateChild, Router,
    ActivatedRouteSnapshot, CanActivate,
    RouterStateSnapshot, Route,
    NavigationExtras } from '@angular/router';
import { AuthService } from '../../api/auth.service';
import { MasterConfigService } from './master-config.service';

@Injectable()
export class GlobalAuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router,
    private masterConfigService: MasterConfigService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // get logged user data
    // console.log(this.authService);
    return this.authService.authAsync().map(
      (data) => {
        // console.log(data);
        if (data.result) {
          this.authService.hasLoggedIn = true;
          this.authService.user = data.data;
        }
        return true;
      }
    );
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // store the url for login/signup redirecting
    const url = state.url;
    if (url !== '/signup' && url !== '/login') {
      this.authService.redirectUrl = state.url;
    }
    return true;
  }

}
