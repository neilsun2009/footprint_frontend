import { Injectable } from '@angular/core';
import { HttpService, IResponse } from './http.service';

@Injectable()
export class MatchService {

  private getMultiUrl = '/api/matches';

  constructor(
    private http: HttpService
  ) { }

  getCount(keyWord: string, before: string, after: string,
    fieldSelfOnly: boolean, onlyField: boolean, callback, err) {
    let params = '?countOnly=true';
    if (keyWord.length !== 0) {
        params += '&s=' + encodeURIComponent(keyWord);
    }
    if (before.length !== 0) {
        params += '&before=' + encodeURIComponent(before);
    }
    if (after.length !== 0) {
        params += '&after=' + encodeURIComponent(after);
    }
    if (fieldSelfOnly) {
        params += '&fieldSelfOnly=true';
    }
    if (onlyField) {
        params += '&onlyField=true';
    }
    this.http.get<IResponse<number>>(`${this.getMultiUrl}${params}`, callback, err);
  }

}
