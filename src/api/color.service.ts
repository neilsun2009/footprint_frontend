import { Injectable } from '@angular/core';
import { HttpService, IResponse } from './http.service';
import { Color } from '../models/color';

@Injectable()
export class ColorService {

  private getMultiUrl = '/api/colors';

  constructor(
    private http: HttpService
  ) { }

  getMulti(colorName: string, teamid: string, callback, err) {
    let params = '?';
    if (colorName.length !== 0) {
      params += '&colorName=' + encodeURIComponent(colorName);
    }
    if (teamid.length !== 0) {
        params += '&teamid=' + encodeURIComponent(teamid);
    }
    this.http.get<IResponse<Color[]>>(`${this.getMultiUrl}${params}`, callback, err);
  }

}
