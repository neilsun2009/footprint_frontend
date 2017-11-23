import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';

import { User } from '../../models/user';
import { UserService } from '../../api/user.service';

@Injectable()
export class UserResolver implements Resolve<User> {
  constructor(private userService: UserService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    let id = route.paramMap.get('id');

    return this.userService.getOneAsync(id).take(1).map(data => {
      if (data.data) {
        return data.data;
      } else { // id not found
        this.router.navigate(['/404']);
        return null;
      }
    });
  }
}
