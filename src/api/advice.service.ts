import { Injectable } from '@angular/core';
import { HttpService, IResponse } from './http.service';
import { Advice } from '../models/advice';

@Injectable()
export class AdviceService {

  private addUrl = '/api/add_advice';

  constructor(
    private http: HttpService
  ) { }

  add(content, callback, err) {
    this.http.post<IResponse<Advice>>(this.addUrl, {content}, callback, err);
  }

}
