import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export class MasterConfig {
    primaryColor?: string;
    secondaryColor?: string;
    showSidebar?: boolean;
    showLoading?: boolean;
}

@Injectable()
export class MasterConfigService {

  // Observable sources
  private masterConfigSource = new Subject<MasterConfig>();

  // Observable string streams
  masterConfig$ = this.masterConfigSource.asObservable();

  setConfig(config: MasterConfig) {
    this.masterConfigSource.next(config);
  }
}
