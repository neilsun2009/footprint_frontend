import { Injectable } from '@angular/core';
import { HttpService, IResponse } from './http.service';
import { Color } from '../models/color';

@Injectable()
export class ColorService {

  private getMultiUrl = '/api/colors';
  private deleteUrl = '/api/delete_color';
  private addUrl = '/api/add_color';
  private updateUrl = '/api/update_color';

  constructor(
    private http: HttpService
  ) { }

  getMulti(offset: number, limit: number, colorName: string, teamid: string, callback, err) {
    let params = '?';
    if (offset) {
      params += '&offset=' + offset;
    }
    if (limit) {
      params += '&limit=' + limit;
    }
    if (colorName.length !== 0) {
      params += '&colorName=' + encodeURIComponent(colorName);
    }
    if (teamid.length !== 0) {
        params += '&teamid=' + encodeURIComponent(teamid);
    }
    this.http.get<IResponse<Color[]>>(`${this.getMultiUrl}${params}`, callback, err);
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
