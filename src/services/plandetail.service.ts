//noinspection ES6UnusedImports

import { Injectable,Inject} from '@angular/core';
import { Apiurl} from '../app/api-url';
import { Http,Headers,Response} from '@angular/http';
import { TokenService } from "../modules/nebula-api/src/services/token.service";

@Injectable()
export class planDetailService {

   api:any;
 constructor(private http: Http, private apiurl:Apiurl, private TokenService:TokenService) {
    this.api=apiurl.api();
 }
  //noinspection JSMethodCanBeStatic
  createAuthorizationHeader(headers:Headers) {
    headers.append('Authorization', 'JWT ' + this.TokenService.getToken()
    );
  }
  query(): any {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.api+'environments/'+sessionStorage.getItem('env_id')+'/details',{headers:headers})
      .map((res: Response) => {
        return res.json();
      });
  }

} 
