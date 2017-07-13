import { TestBed, async, inject} from '@angular/core/testing';
import { Response, Http, HttpModule } from '@angular/http';
import { Observable} from 'rxjs/Observable';

import { RegionService } from './region.service';

describe('RegionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RegionService
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('should ...', inject([RegionService], (service: RegionService) => {
    expect(service).toBeTruthy();
  }));

  it('should query the data using the query method and get the response', 
      async(inject([RegionService], (service: RegionService) => {
      service.query().subscribe(response => {
        expect(response).toBeDefined();
      });
  })));

  it('should query the data using the query method', 
      async(inject([RegionService], (service: RegionService) => {
      service.query().subscribe(response => {
        expect(response[0].Endpoint).toEqual('ec2.ap-south-1.amazonaws.com');
      });
  })));

  it('should query the data using the availability_zone method', 
      async(inject([RegionService], (service: RegionService) => {
      service.availability_zone().subscribe(response => {
        expect(response[2]).toEqual('US-West-2a');
      });
  })));
}); 


