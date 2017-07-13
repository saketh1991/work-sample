//noinspection ES6UnusedImports
import {Injectable, Inject} from '@angular/core';
import {Apiurl} from '../app/api-url';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';

//import { Headers} from '@angular/headers';
import 'rxjs/add/observable/throw';
import {TokenService} from "../modules/nebula-api";


@Injectable()
export class securitykeyService {

  constructor(private http: Http, private apiurl: Apiurl, private TokenService: TokenService) {
    this.api = apiurl.api();
  }

  details: any;
  input: any;
  keyname: any;
  public: any;
  error_details: any;
  api: any;

  key(): any {
    /* this.details={keys:[

     ]


     };*/
    this.input = {
      "keyname": this.keyname,
      "public_key": this.public
    };
    let token = this.TokenService.getToken();
    //this.details.keys.push(this.input);
    return this.http.post(this.api + 'accounts/property/securitykeys', this.input, {
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': "JWT " + token

          // 'Access-Control-Allow-Origin': '*',
          //'Access-Control-Allow-Methods': 'POST',
          //'Access-Control-Max-Age':3000,
          //'Access-Control-Allow-Credentials':'true'
        })
      }
    )
      .map((res: Response) => {

        return res.json();
      });
  }

  keyget(): any {
    let token = this.TokenService.getToken();
    return this.http.get(this.api + 'accounts/property/securitykeys', {
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': "JWT " + token

          // 'Access-Control-Allow-Origin': '*',
          //'Access-Control-Allow-Methods': 'POST',
          //'Access-Control-Max-Age':3000,
          //'Access-Control-Allow-Credentials':'true'
        })
      }
    )
      .map((res: Response) => {

        return res.json();
      }).catch(this.handleServerError);

  }

  private handleServerError(error: Response) {
    this.error_details = Observable.throw(error.json()); // Observable.throw() is undefined at runtime using Webpack
    console.log(this.error_details);
    return this.error_details;

  }


  securitykeydelete(): any {
    let token = this.TokenService.getToken();


    return this.http.delete(this.api + '/accounts/property/securitykeys/' + this.keyname, {
        headers: new Headers({

          'Authorization': "JWT " + token

          // 'Access-Control-Allow-Origin': '*',
          //'Access-Control-Allow-Methods': 'POST',
          //'Access-Control-Max-Age':3000,
          //'Access-Control-Allow-Credentials':'true'
        })
      }
    )
      .map((res: Response) => {

        return res.json();
      });
  }


}
