import { Injectable } from '@angular/core';
import { HttpService, IResponse } from './http.service';

@Injectable()
export class UserService {

  private getMultiUrl = '/api/users';

  constructor(
    private http: HttpService
  ) { }

  getCount(callback, err) {
    let params = '?countOnly=true';
    this.http.get<IResponse<number>>(`${this.getMultiUrl}${params}`, callback, err);
  }

}
