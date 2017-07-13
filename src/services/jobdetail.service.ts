//noinspection ES6UnusedImports
import {Injectable,Inject} from '@angular/core';
import {Apiurl} from '../app/api-url';
import {Http,Headers,Response} from '@angular/http';
import {TokenService} from "../modules/nebula-api/src/services/token.service";

@Injectable()
export class jobDetailService {
  api:any;
 constructor(private http: Http, private apiurl:Apiurl, private tokenService:TokenService) {
    this.api=apiurl.api();
 }
  //noinspection JSMethodCanBeStatic
  createAuthorizationHeader(headers:Headers) {
    if(this.tokenService.hasSession()) {
      headers.append('Authorization', 'JWT ' + this.tokenService.getToken());
    }
  }
  query(): any {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.api+'jobs/'+sessionStorage.getItem('jobid'),{headers:headers})
      .map((res: Response) => {
        return res.json();
      });
  }
  /* getting the env id specific jobs*/
  envJobs(): any {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.api+'environments/'+sessionStorage.getItem('env_id')+'/jobs',{headers:headers})
      .map((res: Response) => {
        return res.json();
      });
  }
  query_all(): any {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.api+'jobs',{headers:headers})
      .map((res: Response) => {
        return res.json();
      });
  }
}
