import { Injectable } from '@angular/core';
import { HttpService, IResponse } from './http.service';
import { Advice } from '../models/advice';

@Injectable()
export class AdviceService {

  private addUrl = '/api/add_advice';
  private getMultiUrl = '/api/get_advices';
  private deleteUrl = '/api/delete_advice';

  constructor(
    private http: HttpService
  ) { }

  add(content, callback, err) {
    this.http.post<IResponse<Advice>>(this.addUrl, {content}, callback, err);
  }

  delete(params, callback, err) {
    this.http.post<IResponse<Comment>>(this.deleteUrl, params, callback, err);
  }

  getMulti(params, callback, err) {

    this.http.post<IResponse<Advice[]>>(this.getMultiUrl, params, callback, err);
  }

}
