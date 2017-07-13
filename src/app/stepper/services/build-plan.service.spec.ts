import { TestBed, async, inject } from '@angular/core/testing';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'; 
import { Response, ResponseOptions, Headers, Http, HttpModule, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { Apiurl } from '../../api-url';
import { TokenService} from "../../../modules/nebula-api/src/services/token.service";
import { HttpService } from './http.service';
import { BuildPlanService } from './build-plan.service'; 
import { BuildPlan, Sizing, Specifics } from '../+models';
import { Payload } from '../+models/payload/payload';

describe('Build plan details', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockBackend,
        Apiurl,
        TokenService,
        HttpService,
        BuildPlanService,
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
    async(inject([BuildPlanService, MockBackend], (service:BuildPlanService, mockBackend: MockBackend) => {
      expect(service).toBeDefined()
  })));

  it('It should query the data',
    async(inject([BuildPlanService, MockBackend], (service: BuildPlanService, mockBackend: MockBackend) => {
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

      service.getBundles().subscribe(response => {
        expect(response.mockResponse.details).toEqual('someDetails');
      });
  }))); 

  it('It should query the data',
    async(inject([BuildPlanService, MockBackend], (service: BuildPlanService, mockBackend: MockBackend) => {
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

      service.getProductDetails('1').subscribe(response => {
        expect(response.mockResponse.details).toEqual('someDetails');
      });
  }))); 

  it('It should query the data',
    async(inject([BuildPlanService, MockBackend], (service: BuildPlanService, mockBackend: MockBackend) => {
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

      service.getProductSizings('1').subscribe(response => {
        expect(response).toBeTruthy();
      });
  })));

  it('It should query the data',
    async(inject([BuildPlanService, MockBackend], (service: BuildPlanService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify(
                 {
                    "concurrency": "2",
                     "nodelimit": {
                     "maximum": "2",
                     "minimum": "1"
                   },
                     "support": "Community"
                 })
            })));
        });

      service.getProductSpecifics('0').subscribe(response => {
        expect(response).toBeTruthy();
      });
  }))); 

   it('It should query the data',
    async(inject([BuildPlanService, MockBackend], (service: BuildPlanService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify(
                  { mockResponse: {
                  details: 'someDetails'} 
               })
            })));
        });

      service.getInstanceDetails().subscribe(response => {
        expect(response).toBeTruthy();
      });
  }))); 

  it('It should query the data',
    async(inject([BuildPlanService, MockBackend], (service: BuildPlanService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify(
                  { mockResponse: {
                  details: 'someDetails'} 
               })
            })));
        });

      service.getRegionAvailability().subscribe(response => {
        expect(response).toBeTruthy();
      });
  })));   

  it('It should query the data',
    async(inject([BuildPlanService, MockBackend], (service: BuildPlanService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify(
                  { mockResponse: {
                  details: 'someDetails'} 
               })
            })));
        });
      let someplan = new BuildPlan; 
      service.createPlan(someplan).subscribe(response => {
        expect(response).toBeTruthy();
      });
  })));   
 //TODO test getting the time zone from the build plan file 
  xit('It should query the data',
    async(inject([BuildPlanService, MockBackend], (service: BuildPlanService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify(
                  { mockResponse: { 
                      'region': 'us-west-2'
                  } 
               })
            })));
        });
      let obj = JSON.stringify({ region: 'us-west-2',
                                 timezone: 'us-pacific'
                              }); 
      sessionStorage.setItem('tddbconfig', obj);
      let appsConfig = {
          dbConfig: {
              timezone: 'us-pacific'
          }
      }
      let someplan = new BuildPlan; 
      service.executePlan(someplan).subscribe(response => {
        expect(response).toBeTruthy();
      });
  })));  
}); 


