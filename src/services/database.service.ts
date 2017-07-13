import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

@Injectable()
export class databaseService {

  constructor(private http: Http) {
  }

  query(): any {
    return this.http.get('data/database.json')
      .map((res: Response) => {
        return res.json();
      });
  }

}
