import { Injectable } from '@angular/core';
import { HttpService, IResponse } from './http.service';

@Injectable()
export class FieldService {

  private getMultiUrl = '/api/simple_fields';

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

}
