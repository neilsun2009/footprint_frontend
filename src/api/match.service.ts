import { Injectable } from '@angular/core';
import { HttpService, IResponse } from './http.service';
import { Match } from '../models/match';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MatchService {

  private getMultiUrl = '/api/matches';
  private getUrl = '/api/match';
  private updateUrl = '/api/update_match';

  constructor(
    private http: HttpService
  ) { }

  getMulti(offset: number, limit: number, keyWord: string,
    before: string, after: string, sort: string,
    fieldSelfOnly: boolean, onlyField: boolean, callback, err) {
    let params = '?';
    if (offset !== 0) {
        params += '&offset=' + offset;
    }
    if (limit !== 0) {
        params += '&count=' + limit;
    }
    if (keyWord.length !== 0) {
        params += '&s=' + encodeURIComponent(keyWord);
    }
    if (before.length !== 0) {
        params += '&before=' + encodeURIComponent(before);
    }
    if (after.length !== 0) {
        params += '&after=' + encodeURIComponent(after);
    }
    if (sort.length !== 0) {
        params += '&sort=' + encodeURIComponent(sort);
    }
    if (fieldSelfOnly) {
        params += '&fieldSelfOnly=true';
    }
    if (onlyField) {
        params += '&onlyField=true';
    }
    this.http.get<IResponse<Match[]>>(`${this.getMultiUrl}${params}`, callback, err);
  }

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

  getOneAsync(id, fieldSelfOnly): Observable<IResponse<Match>> {
    let params = `?matchid=${id}`;
    if (fieldSelfOnly) {
        params += '&fieldSelfOnly=' + fieldSelfOnly.toString();
    }
    return this.http.getAsync<IResponse<Match>>(`${this.getUrl}${params}`);
  }

  update(params, callback, err) {
    this.http.post<IResponse<Match>>(this.updateUrl, params, callback, err);
  }

}
