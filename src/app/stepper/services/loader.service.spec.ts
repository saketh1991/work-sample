import { TestBed, async, inject } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'; 
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject} from "rxjs";

import { Response, ResponseOptions, Headers, Http, HttpModule, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Apiurl } from '../../api-url';
import { TokenService} from "../../../modules/nebula-api/src/services/token.service";
import { LoaderService } from './loader.service';
import { HttpService } from './http.service';

describe('dataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockBackend,
        Apiurl,
        TokenService,
        HttpService,
        LoaderService, 
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
    async(inject([LoaderService, MockBackend], (service:LoaderService, mockBackend: MockBackend) => {
      expect(service).toBeDefined()
  })));

  it('It should query the data',
    async(inject([LoaderService, MockBackend], (service: LoaderService, mockBackend: MockBackend) => {
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

      let subject = new BehaviorSubject({data: 'someData'});
      service.load('someKey', subject).subscribe(response => {
        expect(response.mockResponse.details).toEqual('someDetails');
      });
  }))); 

  it('should returns the loader key', async(inject([LoaderService], (service: LoaderService) => {
     let subject = new BehaviorSubject({});
     subject.error(new Error('test error'));
     service.load('some', subject).subscribe(response => {
    }, (error) => {
      expect(error).toBeDefined(); 
    });
  }))); 

  it('should returns the loader key', async(inject([LoaderService], (service: LoaderService) => {
    let loaderKey = '123';
    service.setLoading(loaderKey); 
    expect(service.loadingFlag[loaderKey]).toEqual(true); 
  })));

  it('should returns the loader key', async(inject([LoaderService], (service: LoaderService) => {
    let loaderKey = '123';
    service.setLoading(loaderKey);  
    service.isLoading(loaderKey); 
    expect(service.loadingFlag[loaderKey]).toEqual(true); 
  })));
}); 



