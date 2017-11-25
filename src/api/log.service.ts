import { Injectable } from '@angular/core';
import { HttpService, IResponse } from './http.service';
import { Log } from '../models/log';

@Injectable()
export class LogService {

  private getMultiUrl = '/api/logs';

  constructor(
    private http: HttpService
  ) { }

  getMulti(callback, err) {
    let params = '?';
    this.http.get<IResponse<Log[]>>(`${this.getMultiUrl}${params}`, callback, err);
  }

}
