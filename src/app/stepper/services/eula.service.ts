import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpService } from './http.service';

@Injectable()
export class EulaService {
  constructor(private _httpService: HttpService) { }

  verifyStatus(planId: string, credentialName: string): Observable<any> {
    const data: any = { credential_name: credentialName };
    return this._httpService.post(`plans/${planId}/status`, data);
  }
}
