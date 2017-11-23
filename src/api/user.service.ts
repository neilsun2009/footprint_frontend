import { Injectable } from '@angular/core';
import { HttpService, IResponse } from './http.service';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  private getMultiUrl = '/api/users';
  private getUrl = '/api/user';
  private updateSelfUrl = '/api/update_self';

  constructor(
    private http: HttpService
  ) { }

  getCount(callback, err) {
    let params = '?countOnly=true';
    this.http.get<IResponse<number>>(`${this.getMultiUrl}${params}`, callback, err);
  }

  getOne(id, callback, err) {
    let params = `?userid=${id}`;
    this.http.get<IResponse<User>>(`${this.getUrl}${params}`, callback, err);
  }

  getOneAsync(id): Observable<IResponse<User>> {
    let params = `?userid=${id}`;
    return this.http.getAsync<IResponse<User>>(`${this.getUrl}${params}`);
  }

  updateSelf(params, callback, err) {
    this.http.post<IResponse<User>>(this.updateSelfUrl, params, callback, err);
  }

}
