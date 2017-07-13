import {Injectable} from '@angular/core';
import { Response, Http} from '@angular/http';

@Injectable()
export class RegionService {


  constructor(private http: Http) {
  }

  query(): any {
    return this.http.get('data/region.json')
      .map((res: Response) => {
        return res.json();
      });
  }

  availability_zone():any{
    return this.http.get('data/availabilityzone.json')
      .map((res: Response) => {
        return res.json();
      });
  }

}
