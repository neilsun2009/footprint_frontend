import { Injectable } from '@angular/core';
import { HttpService, IResponse } from './http.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SofaService {

  private getGeneralUrl = '/api/general';

  constructor(
    private http: HttpService
  ) { }

  getGeneral(sofaScoreId, callback, err) {
    let params = `?sofaScoreId=${sofaScoreId}`;

    this.http.get<IResponse<any>>(`${this.getGeneralUrl}${params}`, callback, err);
  }

}
