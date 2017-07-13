import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpService } from './http.service';
import { CloudCredential } from '../+models';

@Injectable()
export class CloudCredentialService {
  constructor(private _httpService: HttpService) { }

  get(): Observable<any> {
    return this._httpService.get('accounts/property/credentials');
  }

  create(credential: CloudCredential): Observable<any> {
    return this._httpService.post('accounts/property/credentials', credential);
  }

  delete(credential: CloudCredential): Observable<any> {
    return this._httpService.delete(`accounts/property/credentials/${credential.name}`);
  }

  getKeys(): Observable<any> {
    return this._httpService.get('accounts/property/securitykeys');
  }

  createKey(name: string, contents: string): Observable<any> {
    const data: any = { keyname: name, public_key: contents };
    return this._httpService.post('accounts/property/securitykeys', data);
  }

  getRolesPolicy(): Observable<any> {
    return this._httpService.get('accounts/property/provider/aws/rolespolicy');
  }

}
