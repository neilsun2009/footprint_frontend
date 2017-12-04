import { Injectable } from '@angular/core';
import { HttpService, IResponse } from './http.service';
import { Wallpaper } from '../models/wallpaper';

@Injectable()
export class WallpaperService {

  private getMultiUrl = '/api/wallpapers';
  private updateUrl = '/api/update_wallpaper';
  private deleteUrl = '/api/delete_wallpaper';
  private addUrl = '/api/add_wallpaper';

  constructor(
    private http: HttpService
  ) { }

  getMulti(offset: number, limit: number, wallpaperName: string, callback, err) {
    let params = '?';
    if (offset) {
      params += 'offset=' + offset;
    }
    if (limit) {
      params += 'limit=' + limit;
    }
    if (wallpaperName.length !== 0) {
      params += '&wallpaperName=' + encodeURIComponent(wallpaperName);
    }
    this.http.get<IResponse<Wallpaper[]>>(`${this.getMultiUrl}${params}`, callback, err);
  }

  delete(params, callback, err) {
    this.http.post<IResponse<Comment>>(this.deleteUrl, params, callback, err);
  }

  update(params, callback, err) {
    this.http.post<IResponse<Comment>>(this.updateUrl, params, callback, err);
  }

  add(params, callback, err) {
    this.http.post<IResponse<Comment>>(this.addUrl, params, callback, err);
  }


}
