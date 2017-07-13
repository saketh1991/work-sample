import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../../../../app/stepper/services/http.service';

@Injectable()
export class SecurityKeyService {

  constructor(private _httpService: HttpService) {}

  /**
   * Gets a list of current security keys
   *
   * @returns {any}
   */
  list(): Observable<any> {
    return this._httpService.get('accounts/property/securitykeys');
  }

  /**
   * Delete an existing security key
   *
   * @param key
   * @returns {any}
   */
  delete(key: any): Observable<any> {
    return this._httpService.delete(`accounts/property/securitykeys/${key}`);
  }
}
