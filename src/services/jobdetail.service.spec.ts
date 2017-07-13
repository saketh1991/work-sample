import { TestBed, async, inject} from '@angular/core/testing';
import { Injectable, Inject} from '@angular/core';
import {
  Response, ResponseOptions, Headers, Http, HttpModule,
  BaseRequestOptions
} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

import { jobDetailService } from './jobdetail.service';
import { TokenService } from "../modules/nebula-api/src/services/token.service";
import { Apiurl } from '../app/api-url';


describe('jobDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        jobDetailService,
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
    async(inject([jobDetailService, MockBackend], (service:jobDetailService, mockBackend: MockBackend) => {
      expect(service).toBeDefined();
  })));

  it('It should create a user',
    async(inject([jobDetailService, MockBackend], (service: jobDetailService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify({jobid: "123"})
            })));
        });

      service.query().subscribe(response => {
        expect(response.jobid).toEqual('123');
      });
  })));

  it('It should create a user',
    async(inject([jobDetailService, MockBackend], (service: jobDetailService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify({env_id: "123"})
            })));
        });

      service.envJobs().subscribe(response => {
        expect(response.env_id).toEqual('123');
      });
  }))); 

  it('It should get the data using the query all',
    async(inject([jobDetailService, MockBackend], (service: jobDetailService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify({jobs: "got the Jobs response successfully"})
            })));
        });

      service.query_all().subscribe(response => {
        expect(response.jobs).toEqual('got the Jobs response successfully');
      });
  }))); 

}); 


