import { TestBed, async, inject } from '@angular/core/testing';
import { Injectable, Inject } from '@angular/core';
import { Response, ResponseOptions, Headers, Http, HttpModule, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { planDetailService } from './plandetail.service';
import { TokenService } from "../modules/nebula-api/src/services/token.service";
import { Apiurl } from '../app/api-url';


describe('planDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockBackend,
        planDetailService, 
        TokenService,
        Apiurl,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        },
      ],
      imports: [
        HttpModule
      ],
    });
  });

  it('It should define the service',
    async(inject([planDetailService, MockBackend], (service:planDetailService, mockBackend: MockBackend) => {
      expect(service).toBeDefined()
  })));

 it('It should query the data',
    async(inject([planDetailService, MockBackend], (service: planDetailService, mockBackend: MockBackend) => {
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

      service.query().subscribe(response => {
        expect(response.mockResponse.details).toEqual('someDetails');
      });
  })));
}); 


