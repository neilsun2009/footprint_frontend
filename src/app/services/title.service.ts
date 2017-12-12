import { Injectable } from '@angular/core';

@Injectable()
export class TitleService {

  setTitle(str: string) {
    document.title = `${str} - Footprint 2.0 - Presented by Bogo`;
  }

}
