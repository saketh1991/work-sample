import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

@Injectable()
export class predefinedService {

  constructor(private http: Http) {
  }

  query(): any {
    return this.http.get('data/predefined.json')
      .map((res: Response) => {
        return res.json();
      });
  }

}
