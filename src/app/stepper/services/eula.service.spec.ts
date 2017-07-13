import { TestBed, async, inject } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'; 

import { Response, ResponseOptions, Headers, Http, HttpModule, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Apiurl } from '../../api-url';
import { TokenService} from "../../../modules/nebula-api/src/services/token.service";
import { EulaService } from './eula.service';
import { HttpService } from './http.service';

describe('eula service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockBackend,
        Apiurl,
        TokenService,
        HttpService,
        EulaService , 
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
    async(inject([EulaService , MockBackend], (service:EulaService , mockBackend: MockBackend) => {
      expect(service).toBeDefined()
  })));

  it('It should query the data',
    async(inject([EulaService , MockBackend], (service: EulaService , mockBackend: MockBackend) => {
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

      service.verifyStatus('123', 'credentialName').subscribe(response => { 
        expect(response.mockResponse.details).toEqual('someDetails');
      });
  }))); 
}); 


