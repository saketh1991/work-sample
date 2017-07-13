import { TestBed, async, inject} from '@angular/core/testing';
import { Response, Http, HttpModule } from '@angular/http';
import { Observable} from 'rxjs/Observable';

import { tooltipservice } from './tooltip.service';

describe('tooltipservice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        tooltipservice
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('should ...', inject([tooltipservice], (service: tooltipservice) => {
    expect(service).toBeTruthy();
  }));

  it('should query the data using the query method and get the response', 
      async(inject([tooltipservice], (service: tooltipservice) => {
      service.query().subscribe(response => {
        expect(response).toBeDefined();
      });
  })));

  it('should query the data using the query method', 
      async(inject([tooltipservice], (service: tooltipservice) => {
      service.query().subscribe(response => {
        expect(response.builplan[0]['Name of UI Element']).toEqual('Build Plan');
      });
  })));
}); 


