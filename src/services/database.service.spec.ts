import { TestBed, async, inject} from '@angular/core/testing';
import { Response, Http, HttpModule } from '@angular/http';
import { Observable} from 'rxjs/Observable';

import { databaseService } from './database.service';

describe('databaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        databaseService
      ],
      imports: [
        HttpModule
      ],
    });
  });

  it('should ...', inject([databaseService], (service: databaseService) => {
    expect(service).toBeTruthy();
  }));

  it('should query the data using the query method and get the response', 
      async(inject([databaseService], (service: databaseService) => {
      service.query().subscribe(response => {
        expect(response).toBeDefined();
      });
  })));

  it('should query the data using the query method', 
      async(inject([databaseService], (service: databaseService) => {
      service.query().subscribe(response => {
        expect(response.HDD['d2.2xlarge'].InstanceType).toEqual('d2.2xlarge');
      });
  })));
}); 


