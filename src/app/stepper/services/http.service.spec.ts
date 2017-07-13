import { TestBed, async, inject } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'; 

import { Response, ResponseOptions, Headers, Http, HttpModule, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Apiurl } from '../../api-url';
import { TokenService} from "../../../modules/nebula-api/src/services/token.service";
import { TestingModule } from "../../../../testing/testing.module";
import { HttpService } from './http.service';

describe('HttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockBackend,
        Apiurl,
        TokenService,
        HttpService,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        },
      ],
      imports: [
        HttpModule,
        TestingModule
      ],
    });
  });

  it('It should define the service',
    async(inject([HttpService , MockBackend], (service:HttpService , mockBackend: MockBackend) => {
      expect(service).toBeDefined()
  })));

  it('It should update the data',
    async(inject([HttpService , MockBackend], (service:HttpService , mockBackend: MockBackend) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify(
                { mockResponse: {
                  details: 'someDetails'
               }
              })
            })));
        });
      //let sessionKey = TockenService.sessionKey; 
       service.put('some/url/to/backend', 'data').subscribe(response => { 
       expect(response.mockResponse.details).toEqual('someDetails');
      });
  }))); 
}); 


