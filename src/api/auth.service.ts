import { Injectable } from '@angular/core';
import { HttpService, IResponse } from './http.service';
import { User } from '../models/user';

@Injectable()
export class AuthService {

  private loginUrl = '/api/login';
  hasLoggedIn = false;
  redirectUrl = '/';
  user: User;

  constructor(
    private http: HttpService
  ) { }

  login(username, password, callback, err) {
    this.http.post<IResponse<User>>(this.loginUrl, {username, password}, callback, err);
  }

}
