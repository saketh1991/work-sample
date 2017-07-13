import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpService } from './http.service';

@Injectable()
export class DataService {
  constructor(private _httpService: HttpService) { }

  getAvailabilityZones(): Observable<any> {
    return this._httpService.getData('availabilityzone');
  }

  getRegions(): Observable<any> {
    return this._httpService.getData('region');
  }

  getTimeZones(): Observable<any> {
    return this._httpService.getData('timezone');
  }
}
