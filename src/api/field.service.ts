import { Injectable } from '@angular/core';
import { HttpService, IResponse } from './http.service';
import { Field } from '../models/field';

@Injectable()
export class FieldService {

  private getMultiUrl = '/api/simple_fields';
  private addUrl = '/api/add_field';
  private updateUrl = '/api/update_field';
  private deleteUrl = '/api/delete_field';

  constructor(
    private http: HttpService
  ) { }

  getCount(userid: string, callback, err) {
    let params = '?countOnly=true';
    if (userid.length !== 0) {
      params += '&userid=' + encodeURIComponent(userid);
  }
    this.http.get<IResponse<number>>(`${this.getMultiUrl}${params}`, callback, err);
  }

  update(params, callback, err) {
    this.http.post<IResponse<Field>>(this.updateUrl, params, callback, err);
  }

  add(params, callback, err) {
    this.http.post<IResponse<Field>>(this.addUrl, params, callback, err);
  }

  delete(params, callback, err) {
    this.http.post<IResponse<Field>>(this.deleteUrl, params, callback, err);
  }

}
