import { TestBed, async, inject} from '@angular/core/testing';
import { Response, Http, HttpModule } from '@angular/http';
import { Observable} from 'rxjs/Observable';
import { CovalentHttpModule } from '@covalent/http';

import { ProductsService } from './products.service';

describe('ProductsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsService
      ],
      imports: [
        CovalentHttpModule.forRoot()
      ]
    });
  });

  it('should ...', inject([ProductsService], (service: ProductsService) => {
    expect(service).toBeTruthy();
  }));

  it('should query the data using the query method and get the response', 
      async(inject([ProductsService], (service: ProductsService) => {
      service.query().subscribe(response => {
        expect(response).toBeDefined();
      });
  })));

  it('should query the data using the query method', 
      async(inject([ProductsService], (service: ProductsService) => {
      service.query().subscribe(response => {
        expect(response[0].name).toEqual('Analyze This');
      });
  })));
  it('should query the data using the get method and get the response', 
      async(inject([ProductsService], (service: ProductsService) => {
      service.get('1').subscribe(response => {
        expect(response).toBeDefined();
      });
  })));

  it('should query the data using the get method', 
      async(inject([ProductsService], (service: ProductsService) => {
      service.get('1').subscribe(response => {
        expect(response.name).toEqual('Analyze This');
      });
  })));
}); 


