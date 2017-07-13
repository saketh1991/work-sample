import {Injectable, Inject} from '@angular/core';
import {Apiurl} from '../app/api-url';
import {Http, Response, Headers, HttpModule} from '@angular/http';
import {TokenService} from "../modules/nebula-api/src/services/token.service";

@Injectable()
export class eulaService {
  api: any;
  plan_id: any;
  data: any;
  cloudkey: any;


  constructor(private http: Http, private apiurl: Apiurl, private tokenService:TokenService) {
    this.api = apiurl.api();

    //this.result=" ";//need to bind here
    // this.http=http;
  }

  createAuthorizationHeader(headers:Headers) {
    if(this.tokenService.hasSession()) {
      headers.append('Authorization', 'JWT ' + this.tokenService.getToken());
    }
  }

  eulaStatus(): any {
    this.data = {


      "credential_name": this.cloudkey


    };
    let headers = new Headers();
    this.createAuthorizationHeader(headers);

    return this.http.post(this.api + 'plans/' + this.plan_id + '/status', this.data, {headers: headers})
      .map((res: Response) => {
        return res.json();
      });
  }


} 
