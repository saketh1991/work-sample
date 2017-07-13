import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Apiurl } from '../../api-url';
import {TokenService} from "../../../modules/nebula-api/src/services/token.service";

@Injectable()
export class HttpService {
  private _apiUrl: any;

  constructor(private http: Http, apiSettings: Apiurl, private tokenService:TokenService) {
    this._apiUrl = apiSettings.api();
  }

  post(uri: string, data: any): Observable<any> {
    return this.http.post(`${this._apiUrl}${uri}`, data, this.getOptions()).map((r: Response) => {
      return r.json();
    });
  }

  put(uri: string, data: any): Observable<any> {
    return this.http.put(`${this._apiUrl}${uri}`, data, this.getOptions()).map((r: Response) => {
      return r.json();
    });
  }

  delete(uri: string): Observable<any> {
    return this.http.delete(`${this._apiUrl}${uri}`, this.getOptions()).map((r: Response) => r.json());
  }

  get(uri: string): Observable<any> {
    return this.http.get(`${this._apiUrl}${uri}`, this.getOptions()).map((r: Response) => r.json());
  }

  getData(name: string): Observable<any> {
    return this.http.get(`/data/${name}.json`).map((r: Response) => r.json());
  }

  private getOptions(): any {

    let headers = new Headers();
    if(this.tokenService.hasSession()) {
      headers.append('Authorization', 'JWT ' + this.tokenService.getToken());
    }
    return { headers };
  }
}
