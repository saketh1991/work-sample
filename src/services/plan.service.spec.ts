import { TestBed, async, inject} from '@angular/core/testing';
import {
  Response, ResponseOptions, Headers, Http, HttpModule,
  BaseRequestOptions
} from '@angular/http';
import { MockBackend, MockConnection} from '@angular/http/testing';
import { Apiurl } from '../app/api-url';
import { Injectable,Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TokenService } from "../modules/nebula-api/src/services/token.service";
import { planService } from './plan.service';


describe('planService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        },
        planService,
        Apiurl,
        TokenService
      ],
      imports: [
        HttpModule
      ],
    });
  });

 it('should ...', inject([planService], (service: planService) => {
    expect(service).toBeTruthy();
  }));

 it('It should get the bundle detail',
    async(inject([planService, MockBackend], (service: planService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify({data: "got the bundle_detail successfully"})
            })));
        });

       let user = {code:'codesample'};
       let bundle = sessionStorage.setItem('bundle', JSON.stringify(user));
       let req = {
        storage_type : 'EBS_SSD',
        additional_features: [{checked: true, name: 'Data Mover'}],
        apps: [{checked: true, name: 'Viewpoint Single System'}]
       };

       service.query(req).subscribe(response => {

       expect(response.data).toEqual('got the bundle_detail successfully');
       });
 }))); 

 it('It should get node limit',
    async(inject([planService, MockBackend], (service: planService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify({nodeLimit: "got the node limit successfully"})
            })));
        });

      service.node_limit('sometype').subscribe(response => {
        expect(response.nodeLimit).toEqual('got the node limit successfully');
      });
 }))); 

 it('It should get the plan',
    async(inject([planService, MockBackend], (service: planService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify({plan: "got the plan successfully"})
            })));
        });

      service.tdplan().subscribe(response => {
        expect(response.plan).toEqual('got the plan successfully');
      });
 }))); 

 it('It should get the envirmont data',
    async(inject([planService, MockBackend], (service: planService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify({message: "got the data successfully"})
            })));
        });

       let user = {code:'codesample'};
       let bundle = sessionStorage.setItem('bundle', JSON.stringify(user));
       let req = {
            availability_zone: 'US', 
            public_subnet: 'public',
            cidr: 'cidr',
            kanji_support: 'support',
            db_nickname: 'nickme',
            db_systemname: 'systemname',
            db_password: 'password', 
            sm_site_id: 'sitId', 
            sm_rest_pass: 'restPass',
            planid: 'planid',
            region: 'region',
            timezone: 'timezone',
            vpc_id: 'vpc_id'
       };

       service.environment(req).subscribe(response => {

       expect(response.message).toEqual('got the data successfully');
       });
 }))); 

 it('It should get the bundle detail',
    async(inject([planService, MockBackend], (service: planService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify({bundleDetail: "got the bundle_detail successfully"})
            })));
        });

       let user = {code:'codesample'};
       let bundle = sessionStorage.setItem('bundle', JSON.stringify(user));

       service.bundle_detail().subscribe(response => {

       expect(response.bundleDetail).toEqual('got the bundle_detail successfully');
       });
 }))); 
 
 it('It should get the storage type',
    async(inject([planService, MockBackend], (service: planService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify({message: "got the data successfully"})
            })));
        });

      service.bundle_storagetype().subscribe(response => {
        expect(response.message).toEqual('got the data successfully');
      });
 }))); 

 it('It should get the productList',
    async(inject([planService, MockBackend], (service: planService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify({productList: "got the productList successfully"})
            })));
        });

      service.product_list().subscribe(response => {
        expect(response.productList).toEqual('got the productList successfully');
      });
 }))); 

 it('It should instance details',
    async(inject([planService, MockBackend], (service: planService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify({instanceDetails: "got the instanceDetails successfully"})
            })));
        });

      service.instance_details().subscribe(response => {
        expect(response.instanceDetails).toEqual('got the instanceDetails successfully');
      });
 }))); 

 it('It should get the productDetails',
    async(inject([planService, MockBackend], (service: planService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify({productDetails: "got the product details successfully"})
            })));
        });

      service.product_details().subscribe(response => {
        expect(response.productDetails).toEqual('got the product details successfully');
      });
 }))); 

 it('It should get node details',
    async(inject([planService, MockBackend], (service: planService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify({details: "got the details successfully"})
            })));
        });

      service.node_details().subscribe(response => {
        expect(response.details).toEqual('got the details successfully');
      });
 }))); 
}); 


