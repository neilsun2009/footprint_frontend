import { Injectable } from '@angular/core';
import { HttpService, IResponse } from './http.service';
import { Comment } from '../models/comment';

@Injectable()
export class CommentService {

  private getMultiUrl = '/api/comments';
  private updateUrl = '/api/update_comment';
  private addUrl = '/api/add_comment';
  private deleteUrl = '/api/delete_comment';

  constructor(
    private http: HttpService
  ) { }

  getCount(matchid: string, commentType: string, userid: string,
    callback, err) {
    let params = '?countOnly=true';
    if (matchid.length !== 0) {
      params += '&matchid=' + encodeURIComponent(matchid);
    }
    if (userid.length !== 0) {
      params += '&userid=' + encodeURIComponent(userid);
    }
    if (commentType.length !== 0) {
      params += '&commentType=' + encodeURIComponent(commentType);
    }
    this.http.get<IResponse<number>>(`${this.getMultiUrl}${params}`, callback, err);
  }

  getMulti(offset: number, limit: number, matchid: string, commentType: string, fullMatch: boolean,
    callback, err) {
    let params = '?';
    if (offset !== 0) {
      params += '&offset=' + offset;
    }
    if (limit !== 0) {
        params += '&limit=' + limit;
    }
    if (matchid.length !== 0) {
      params += '&matchid=' + encodeURIComponent(matchid);
    }
    if (commentType.length !== 0) {
      params += '&commentType=' + encodeURIComponent(commentType);
    }
    if (fullMatch) {
      params += '&fullMatch=true';
    }
    this.http.get<IResponse<Comment[]>>(`${this.getMultiUrl}${params}`, callback, err);
  }

  update(params, callback, err) {
    this.http.post<IResponse<Comment>>(this.updateUrl, params, callback, err);
  }

  add(params, callback, err) {
    this.http.post<IResponse<Comment>>(this.addUrl, params, callback, err);
  }

  delete(params, callback, err) {
    this.http.post<IResponse<Comment>>(this.deleteUrl, params, callback, err);
  }

}
