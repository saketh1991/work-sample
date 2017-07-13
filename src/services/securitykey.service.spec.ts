import { TestBed, async, inject} from '@angular/core/testing';
import { Injectable, Inject} from '@angular/core';
import {
  Response, ResponseOptions, Headers, Http, HttpModule,
  BaseRequestOptions
} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

import { securitykeyService } from './securitykey.service';
import { TokenService } from "../modules/nebula-api/src/services/token.service";
import { Apiurl } from '../app/api-url';


describe('securitykeyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        securitykeyService,
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
    async(inject([securitykeyService, MockBackend], (service:securitykeyService, mockBackend: MockBackend) => {
      expect(service).toBeDefined();
  })));

  it('It should get the data using the key method',
    async(inject([securitykeyService, MockBackend], (service: securitykeyService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify({securitykey: "1234"})
            })));
        });

      service.key().subscribe(response => {
        expect(response.securitykey).toEqual('1234');
      });
  }))); 

  it('It should get the data using key get',
    async(inject([securitykeyService, MockBackend], (service: securitykeyService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify({securitykey: "1234"})
            })));
        });

      service.keyget().subscribe(response => {
        expect(response.securitykey).toEqual('1234');
      });
  }))); 
  
  it('It should delete the security key',
    async(inject([securitykeyService, MockBackend], (service: securitykeyService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify({securitykey: "1234"})
            })));
        });

      service.securitykeydelete().subscribe(response => {
        expect(response.securitykey).toEqual('1234');
      });
  }))); 
}); 
