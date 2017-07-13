import { TestBed, async, inject } from '@angular/core/testing';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'; 
import { Response, ResponseOptions, Headers, Http, HttpModule, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { Apiurl } from '../../api-url';
import { TokenService} from "../../../modules/nebula-api/src/services/token.service";
import { CloudCredentialService } from './cloud-credential.service';
import { HttpService } from './http.service';
import { CloudCredential } from '../+models';

describe('CloudCredentialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockBackend,
        Apiurl,
        TokenService,
        HttpService,
        CloudCredentialService, 
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
    async(inject([CloudCredentialService, MockBackend], (service:CloudCredentialService, mockBackend: MockBackend) => {
      expect(service).toBeDefined()
  })));

  it('It should query the data',
    async(inject([CloudCredentialService, MockBackend], (service: CloudCredentialService, mockBackend: MockBackend) => {
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

      service.get().subscribe(response => {
        expect(response.mockResponse.details).toEqual('someDetails');
      });
  }))); 

  it('It should query the data',
    async(inject([CloudCredentialService, MockBackend], (service: CloudCredentialService, mockBackend: MockBackend) => {
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
      const CLOUD_CREDENTIAL_KEY_TYPE: string = 'aws_credential';
      let credential = new CloudCredential('tester', CLOUD_CREDENTIAL_KEY_TYPE);
      service.create(credential).subscribe(response => {
        expect(response.mockResponse.details).toEqual('someDetails');
      });
  }))); 

  it('It should query the data',
    async(inject([CloudCredentialService, MockBackend], (service: CloudCredentialService, mockBackend: MockBackend) => {
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
      const CLOUD_CREDENTIAL_KEY_TYPE: string = 'aws_credential';
      let credential = new CloudCredential('tester', CLOUD_CREDENTIAL_KEY_TYPE);
      service.delete(credential).subscribe(response => {
        expect(response).toBeTruthy();
      });
  }))); 

  it('It should query the data',
    async(inject([CloudCredentialService, MockBackend], (service: CloudCredentialService, mockBackend: MockBackend) => {
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
     
      service.getKeys().subscribe(response => {
        expect(response).toBeTruthy();
      });
  }))); 

  it('It should query the data',
    async(inject([CloudCredentialService, MockBackend], (service: CloudCredentialService, mockBackend: MockBackend) => {
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
     
      service.createKey('Tommy', 'something').subscribe(response => {
        expect(response).toBeTruthy();
      });
  })));

  it('It should query the data',
    async(inject([CloudCredentialService, MockBackend], (service: CloudCredentialService, mockBackend: MockBackend) => {
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
     
      service.getRolesPolicy().subscribe(response => {
        expect(response).toBeTruthy();
      });
  }))); 
}); 


