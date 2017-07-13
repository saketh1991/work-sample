import { TestBed, async, inject} from '@angular/core/testing';
import { Response, Http, HttpModule } from '@angular/http';
import { Observable} from 'rxjs/Observable';
import { CovalentHttpModule } from '@covalent/http';

import { AlertsService } from './alerts.service';

describe('AlertsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AlertsService
      ],
      imports: [
        CovalentHttpModule.forRoot()
      ],
    });
  });

  it('should ...', inject([AlertsService], (service: AlertsService) => {
    expect(service).toBeTruthy();
  }));

  it('should query the data using the query method and get the response', 
      async(inject([AlertsService], (service: AlertsService) => {
      service.query().subscribe(response => {
        expect(response).toBeDefined();
      });
  })));

  it('should query the data using the query method', 
      async(inject([AlertsService], (service: AlertsService) => {
      service.query().subscribe(response => {
        expect(response[0].name).toEqual('Sim Card');
      });
  })));

  it('should query the data using the get method and return the response', 
      async(inject([AlertsService], (service: AlertsService) => {
      service.get('1').subscribe(response => {
        expect(response).toBeDefined();
      });
  })));

  it('should query the data using the get method and return the name proprety of the first object', 
      async(inject([AlertsService], (service: AlertsService) => {
      service.get('2').subscribe(response => {
      expect(response.name).toEqual('Motherboard');
      });
  })));
}); 


