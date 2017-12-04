import { Injectable } from '@angular/core';
import { HttpService, IResponse } from './http.service';
import { Log } from '../models/log';

@Injectable()
export class LogService {

  private getMultiUrl = '/api/logs';
  private deleteUrl = '/api/delete_log';
  private addUrl = '/api/add_log';
  private updateUrl = '/api/update_log';

  constructor(
    private http: HttpService
  ) { }

  getMulti(offset: number, limit: number, callback, err) {
    let params = '?';
    if (offset) {
      params += 'offset=' + offset;
    }
    if (limit) {
      params += '&limit=' + limit;
    }
    this.http.get<IResponse<Log[]>>(`${this.getMultiUrl}${params}`, callback, err);
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
