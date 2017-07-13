import { TestBed, async, inject} from '@angular/core/testing';
import { Response, Http, HttpModule } from '@angular/http';
import { Observable} from 'rxjs/Observable';
import { CovalentHttpModule } from '@covalent/http';

import { UsersService } from './users.service';

describe('UsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersService
      ],
      imports: [
        CovalentHttpModule.forRoot()
      ]
    });
  });

  it('should ...', inject([UsersService], (service: UsersService) => {
    expect(service).toBeTruthy();
  }));

  it('should query the data using the query method and get the response', 
      async(inject([UsersService], (service: UsersService) => {
      service.staticQuery().subscribe(response => {
        expect(response).toBeDefined();
      });
  })));

  it('should query the data using the staticQuery method', 
      async(inject([UsersService], (service: UsersService) => {
      service.staticQuery().subscribe(response => {
        expect(response[0].display_name).toEqual('Suzy Cuningham');
      });
  })));
}); 


