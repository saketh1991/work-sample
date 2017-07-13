
import {Injectable,Inject} from '@angular/core';
import { Apiurl } from '../app/api-url';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
@Injectable()
export class loginService {
  body: any;
  username: any;
  password: any;
  error_details: any;
  api:any;

  constructor(private http: Http, private apiurl:Apiurl) {
    this.api=apiurl.api();
  }
/* service for the user login*/
  accounts(): any {
    this.body = {

      "username": this.username,
      "password": this.password,

    };
    return this.http.post(this.api+'accounts',
      JSON.stringify(this.body), {
        headers: new Headers({
          'Content-Type': 'application/json'
          // 'Access-Control-Allow-Origin': '*',
          //'Access-Control-Allow-Methods': 'POST',
          //'Access-Control-Max-Age':3000,
          //'Access-Control-Allow-Credentials':'true'
        })
      }
    ).map((res: Response) => {
      return res.json();
    }).catch(this.handleServerError);

  }
  /*service to create the account for the user*/

  createAccount(): any {

    this.body = {

      "username": this.username,
      "password": this.password,

    };
    return this.http.post(this.api+'/accounts/firstuser',
      JSON.stringify(this.body), {
        headers: new Headers({
          'Content-Type': 'application/json'
          // 'Access-Control-Allow-Origin': '*',
          //'Access-Control-Allow-Methods': 'POST',
          //'Access-Control-Max-Age':3000,
          //'Access-Control-Allow-Credentials':'true'
        })
      }
    ).map((res: Response) => {
      return res.json();
    }).catch(this.handleServerError);

  }
  private handleServerError(error: Response) {
    this.error_details = Observable.throw(error.json()); // Observable.throw() is undefined at runtime using Webpack
    console.log(this.error_details);
    return this.error_details;

  }
}
