import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import { Http, Response, Headers } from '@angular/http';
import {TokenService} from './token.service';

/**
 * Wrapper class for nebula api
 *
 * http://sdlc7609.labs.teradata.com:8080/job/tdmc-restful/lastSuccessfulBuild/artifact/rest/raml/tdmcapi.html#
 *
 */
@Injectable()
export class NebulaService {
  api:any;

  constructor(private http: Http, private tokenService:TokenService) {
    this.api=environment.nebulaApi;
  }

  /**
   * Run a get request against the nebula api
   *
   * @param path
   * @returns {Observable<R>}
   */
  get(path:string): any {
    let headers = this.getHeaders();
    return this.http.get(this.api+path,{headers:headers})
      .map((res: Response) => {
        return res.json();
      });
  }

  /**
   * Run a delete request against the nebula api
   *
   * @param path
   * @returns {Observable<R>}
   */
  delete(path:string): any {
    let headers = this.getHeaders();
    return this.http.delete(this.api+path,{headers:headers})
      .map((res: Response) => {
        return res.json();
      });
  }

  /**
   * Run a post request against the nebula api
   *
   * @param path
   * @returns {Observable<R>}
   */
  post(path:string, params: any): any {
    let headers = this.getHeaders();
    return this.http.post(this.api+path, params, {headers:headers})
      .map((res: Response) => {
        return res.json();
      });
  }

  /**
   * Run a put request against the nebula api
   *
   * @param path
   * @returns {Observable<R>}
   */
  put(path:string, params: any): any {
    let headers = this.getHeaders();
    return this.http.put(this.api+path, params, {headers:headers})
      .map((res: Response) => {
        return res.json();
      });
  }

  /**
   * Adds appropriate headers to the request
   *
   * @todo this will be replaced with a global interceptor
   */
  getHeaders() {
    let headers = new Headers();
    if(this.tokenService.hasSession()) {
      headers.append('Authorization', 'JWT ' + this.tokenService.getToken());
    }
    return headers;
  }

}
