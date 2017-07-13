import { TestBed, async, inject} from '@angular/core/testing';
import { Injectable, Inject} from '@angular/core';
import {
  Response, ResponseOptions, Headers, Http, HttpModule,
  BaseRequestOptions
} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

import { eulaService } from './eula.service';
import { TokenService } from "../modules/nebula-api/src/services/token.service";
import { Apiurl } from '../app/api-url';


describe('eulaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        eulaService,
        Apiurl,
        TokenService,
        MockBackend,
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
    async(inject([eulaService, MockBackend], (service:eulaService, mockBackend: MockBackend) => {
      expect(service).toBeDefined();
  })));

  
  it('It should get the status',
    async(inject([eulaService, MockBackend], (service: eulaService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify({status: "got the status successfully"})
            })));
        });

      service.eulaStatus().subscribe(response => {
        expect(response.status).toEqual('got the status successfully');
      });
  }))); 

}); 


