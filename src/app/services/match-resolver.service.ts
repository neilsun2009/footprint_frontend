import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';

import { Match } from '../../models/match';
import { MatchService } from '../../api/match.service';

@Injectable()
export class MatchResolver implements Resolve<Match> {
  constructor(private matchService: MatchService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Match> {
    let id = route.paramMap.get('id');

    return this.matchService.getOneAsync(id, true).take(1).map(data => {
      if (data.data) {
        return data.data;
      } else { // id not found
        this.router.navigate(['/404']);
        return null;
      }
    });
  }
}
