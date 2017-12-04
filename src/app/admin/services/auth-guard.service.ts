import { Injectable } from '@angular/core';
import { CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot, Route,
    NavigationExtras } from '@angular/router';
import { AuthService } from '../../../api/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.authAsync().map(
      (data) => {
        if (data.result) {
          this.authService.hasLoggedIn = true;
          this.authService.user = data.data;
          if (this.authService.user.access === 'administrator') {
            return true;
          } else {
            this.router.navigate(['/']);
            return false;
          }
        }
        this.router.navigate(['/']);
        return false;
      }
    );
  }
}
