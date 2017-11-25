import { Injectable } from '@angular/core';
import { HttpService, IResponse } from './http.service';
import { Wallpaper } from '../models/wallpaper';

@Injectable()
export class WallpaperService {

  private getMultiUrl = '/api/wallpapers';

  constructor(
    private http: HttpService
  ) { }

  getMulti(wallpaperName, callback, err) {
    let params = '?';
    if (wallpaperName.length !== 0) {
      params += '&wallpaperName=' + encodeURIComponent(wallpaperName);
    }
    this.http.get<IResponse<Wallpaper[]>>(`${this.getMultiUrl}${params}`, callback, err);
  }

}
