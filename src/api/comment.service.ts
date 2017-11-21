import { Injectable } from '@angular/core';
import { HttpService, IResponse } from './http.service';

@Injectable()
export class CommentService {

  private getMultiUrl = '/api/comments';

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

}
