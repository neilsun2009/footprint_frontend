import { Injectable } from '@angular/core';
import { CanActivateChild, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot, Route,
    NavigationExtras } from '@angular/router';
import { AuthService } from '../../api/auth.service';

@Injectable()
export class GlobalAuthGuard implements CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {}

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // store the url for login/signup redirecting
    const url = state.url;
    if (url !== '/signup' && url !== '/login') {
      this.authService.redirectUrl = state.url;
    }
    return true;
  }

}
