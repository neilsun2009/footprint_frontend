import { Injectable } from '@angular/core';
import { CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot, Route,
    NavigationExtras } from '@angular/router';
import { AuthService } from '../../api/auth.service';

@Injectable()
export class LoginAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    // already logged in
    if (this.authService.hasLoggedIn) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
