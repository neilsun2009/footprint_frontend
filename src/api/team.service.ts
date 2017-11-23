import { Injectable } from '@angular/core';
import { HttpService, IResponse } from './http.service';
import { Team } from '../models/team';

@Injectable()
export class TeamService {

  private getMultiUrl = '/api/teams';

  constructor(
    private http: HttpService
  ) { }

  getMulti(teamName: string, country: string, callback, err) {
    let params = '?';
    if (teamName.length !== 0) {
      params += '&teamName=' + encodeURIComponent(teamName);
    }
    if (country.length !== 0) {
        params += '&country=' + encodeURIComponent(country);
    }
    this.http.get<IResponse<Team[]>>(`${this.getMultiUrl}${params}`, callback, err);
  }

}
