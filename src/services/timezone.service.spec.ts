import { TestBed, async, inject} from '@angular/core/testing';
import { Response, Http, HttpModule } from '@angular/http';
import { Observable} from 'rxjs/Observable';

import { TimezoneService } from './timezone.service';

describe('TimezoneService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TimezoneService
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('should ...', inject([TimezoneService], (service: TimezoneService) => {
    expect(service).toBeTruthy();
  }));

  it('should query the data using the query method and get the response', 
      async(inject([TimezoneService], (service: TimezoneService) => {
      service.query().subscribe(response => {
        expect(response).toBeDefined();
      });
  })));

  it('should query the data using the query method', 
      async(inject([TimezoneService], (service: TimezoneService) => {
      service.query().subscribe(response => {
        expect(response[0]).toEqual('Africa/Abidjan');
      });
  })));
}); 


