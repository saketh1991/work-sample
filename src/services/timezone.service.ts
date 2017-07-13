import { Injectable } from '@angular/core';
import { Response, Http} from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class TimezoneService {


  constructor(private http: Http) {
  }

  query(): any {
    return this.http.get('data/timezone.json')
      .map((res: Response) => {
        return res.json();
      });
  }


}
