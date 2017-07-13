import { TestBed, async, inject} from '@angular/core/testing';
import { Response, Http, HttpModule } from '@angular/http';
import { Observable} from 'rxjs/Observable';
import { CovalentHttpModule } from '@covalent/http';

import { ItemsService } from './items.service';

describe('ItemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ItemsService
      ],
      imports: [
        CovalentHttpModule.forRoot()
      ]
    });
  });

  it('should ...', inject([ItemsService], (service: ItemsService) => {
    expect(service).toBeTruthy();
  }));

  it('should query the data using the staticQuery method and get the response', 
      async(inject([ItemsService], (service: ItemsService) => {
      service.staticQuery().subscribe(response => {
        expect(response).toBeDefined();
      });
  })));

  it('should query the data using the staticGet method and get the response', 
      async(inject([ItemsService], (service: ItemsService) => {
      service.staticGet('1').subscribe(response => {
        expect(response).toBeDefined();
      });
  })));

  it('should query the data using the query method and get the response', 
      async(inject([ItemsService], (service: ItemsService) => {
      service.query().subscribe(response => {
        expect(response).toBeDefined();
      });
  })));

  it('should query the data using the get method and get the response', 
      async(inject([ItemsService], (service: ItemsService) => {
      service.get('1').subscribe(response => {
        expect(response).toBeDefined();
      });
  })));

  it('should query the data using the staticQuery method', 
      async(inject([ItemsService], (service: ItemsService) => {
      service.staticQuery().subscribe(response => {
        expect(response[0].name).toEqual('Suzy Cuningham');
      });
  }))); 

  it('should query the data using the staticGet method', 
      async(inject([ItemsService], (service: ItemsService) => {
      service.staticGet('1').subscribe(response => {
        expect(response.name).toEqual('Suzy Cuningham');
      });
  }))); 

  it('should query the data using the query method', 
      async(inject([ItemsService], (service: ItemsService) => {
      service.query().subscribe(response => {
        expect(response[0].name).toEqual('Suzy Cuningham');
      });
  }))); 

  it('should query the data using the get method', 
      async(inject([ItemsService], (service: ItemsService) => {
      service.get('1').subscribe(response => {
        expect(response.name).toEqual('Suzy Cuningham');
      });
  }))); 
}); 


