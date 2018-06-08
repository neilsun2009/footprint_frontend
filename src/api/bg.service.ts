import { Injectable } from '@angular/core';
import { HttpService, IResponse } from './http.service';
import { Bg } from '../models/bg';

@Injectable()
export class BgService {

  private getMultiUrl = '/api/bgs';
  private updateUrl = '/api/update_bg';
  private deleteUrl = '/api/delete_bg';
  private addUrl = '/api/add_bg';

  constructor(
    private http: HttpService
  ) { }

  getMulti(offset: number, limit: number, inUse: boolean, callback, err) {
    let params = '?';
    if (offset) {
      params += 'offset=' + offset;
    }
    if (limit) {
      params += '&limit=' + limit;
    }
    if (inUse) {
      params += '&inUse=true';
    }
    this.http.get<IResponse<Bg[]>>(`${this.getMultiUrl}${params}`, callback, err);
  }

  getMultiAsync(offset: number, limit: number, inUse: boolean) {
    let params = '?';
    if (offset) {
      params += 'offset=' + offset;
    }
    if (limit) {
      params += '&limit=' + limit;
    }
    if (inUse) {
      params += '&inUse=true';
    }
    return this.http.getAsync<IResponse<Bg[]>>(`${this.getMultiUrl}${params}`);
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
