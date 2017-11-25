import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { HttpService, IResponse } from './http.service';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  private loginUrl = '/api/login';
  private logoutUrl = '/api/logout';
  private signupUrl = '/api/signup';
  private authUrl = '/api/self';

  hasLoggedIn = false;
  redirectUrl = '/';
  user: User;

  constructor(
    private http: HttpService
  ) { }

  login(username, password, callback, err) {
    this.http.post<IResponse<User>>(this.loginUrl, {username, password}, callback, err);
  }

  signup(username, password, callback, err) {
    this.http.post<IResponse<User>>(this.signupUrl, {username, password}, callback, err);
  }

  auth(callback, err) {
    this.http.get<IResponse<User>>(this.authUrl, callback, err);
  }

  authAsync() {
    return this.http.getAsync<IResponse<User>>(this.authUrl);
  }

  logout(callback, err) {
    this.http.post<IResponse<null>>(this.logoutUrl, null, callback, err);
  }

}
