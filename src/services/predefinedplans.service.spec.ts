import { TestBed, async, inject} from '@angular/core/testing';
import { Response, Http, HttpModule } from '@angular/http';
import { Observable} from 'rxjs/Observable';

import { predefinedService } from './predefinedplans.service';

describe('predefinedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        predefinedService
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('should ...', inject([predefinedService], (service: predefinedService) => {
    expect(service).toBeTruthy();
  }));

  it('should get the response', 
      async(inject([predefinedService], (service: predefinedService) => {
      service.query().subscribe(response => {
        expect(response).toBeDefined();
      });
  })));

  it('should query the data using the query method', 
      async(inject([predefinedService], (service: predefinedService) => {
      service.query().subscribe(response => {
        expect(response.plan.properties.plan_name).toEqual('Basic');
      });
  }))); 
}); 


