import { Injectable } from '@angular/core';
import { HttpService, IResponse } from './http.service';
import { Team } from '../models/team';

@Injectable()
export class TeamService {

  private getMultiUrl = '/api/teams';
  private deleteUrl = '/api/delete_team';
  private addUrl = '/api/add_team';
  private updateUrl = '/api/update_team';

  constructor(
    private http: HttpService
  ) { }

  getMulti(offset: number, limit: number, teamName: string, country: string, callback, err) {
    let params = '?';
    if (teamName.length !== 0) {
      params += '&teamName=' + encodeURIComponent(teamName);
    }
    if (country.length !== 0) {
      params += '&country=' + encodeURIComponent(country);
    }
    if (offset) {
      params += '&offset=' + offset;
    }
    if (limit) {
      params += '&limit=' + limit;
    }
    this.http.get<IResponse<Team[]>>(`${this.getMultiUrl}${params}`, callback, err);
  }

  delete(params, callback, err) {
    this.http.post<IResponse<Comment>>(this.deleteUrl, params, callback, err);
  }

  update(params, callback, err) {
    this.http.post<IResponse<Comment>>(this.updateUrl, params, callback, err);
  }

  add(params, callback, err) {
    this.http.post<IResponse<Comment>>(this.addUrl, params, callback, err);
  }

}
