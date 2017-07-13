/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {
  Response, ResponseOptions, Headers, Http, HttpModule,
  BaseRequestOptions
} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

import {NebulaService} from './nebula.service';
import {TestingModule} from "../../../../../testing/testing.module";
import {environment} from '../../../../environments/environment';
import {TokenService} from "./token.service";
import {HttpService} from "../../../../app/stepper/services/http.service";
import {Apiurl} from "../../../../app/api-url";

describe('NebulaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        TestingModule
      ],
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        },
        NebulaService,
        HttpService,
        Apiurl
      ],
    });
  });

  it('It should construct',
    async(inject([NebulaService, MockBackend], (service: NebulaService, mockBackend: MockBackend) => {
      expect(service).toBeDefined()
    })));



  it('should not append the auth headers to the request if no token exists',
    async(inject([NebulaService], (service: NebulaService) => {
      let headers = service.getHeaders();
      expect(headers.get('Authentication')).toBeFalsy();
    })));

  it('should append the auth headers to the request if a token exists',
    async(inject([NebulaService], (service: NebulaService) => {
      let tokenService = TestBed.get(TokenService);
      tokenService.setSession(tokenService.mockToken(), {});
      let headers = service.getHeaders();
      expect(headers.get('Authorization')).toBeTruthy();
    })));

  it('It should prepend the nebula api url to get requests',
    async(inject([NebulaService, MockBackend], (service: NebulaService, mockBackend: MockBackend) => {
      let connections = mockBackend.connections;
      connections.subscribe((con) => {
        let url = environment.nebulaApi + 'test';
        expect(con.request.url).toEqual(url);
      });
      service.get('test');
    })));

  it('It should send a get request to the nebula api',
    async(inject([NebulaService, MockBackend], (service: NebulaService, mockBackend: MockBackend) => {
      let connections = mockBackend.connections;
      connections.subscribe((con) => {
        expect(con.request.method).toEqual(0);
      });
      service.get('test');
    })));

  it('It should parse the get response',
    async(inject([NebulaService, MockBackend], (service: NebulaService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify({message: "test response"})
            })));
        });
      service.get('test').subscribe((response) => {
        expect(response.message).toEqual('test response');
      });
    })));

  it('It should prepend the nebula api url to post requests',
    async(inject([NebulaService, MockBackend], (service: NebulaService, mockBackend: MockBackend) => {
      let connections = mockBackend.connections;
      connections.subscribe((con) => {
        let url = environment.nebulaApi + 'test';
        expect(con.request.url).toEqual(url);
      });
      service.post('test', {"test": "value"});
    })));

  it('It should send a post request to the nebula api',
    async(inject([NebulaService, MockBackend], (service: NebulaService, mockBackend: MockBackend) => {
      let connections = mockBackend.connections;
      connections.subscribe((con) => {
        expect(con.request.method).toEqual(1);
      });
      service.post('test', {"test": "value"});
    })));


  it('It should send post params to the nebula api',
    async(inject([NebulaService, MockBackend], (service: NebulaService, mockBackend: MockBackend) => {
      let connections = mockBackend.connections;
      let params = {"test": "value"};
      connections.subscribe((con) => {
        let body = JSON.parse(con.request.getBody());
        expect(body).toEqual(params);
      });
      service.post('test', params);
    })));


  it('It should parse the post response',
    async(inject([NebulaService, MockBackend], (service: NebulaService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify({message: "test response"})
            })));
        });
      service.post('test', {test: 'params'}).subscribe((response) => {
        expect(response.message).toEqual('test response');
      });
    })));

  it('It should prepend the nebula api url to put requests',
    async(inject([NebulaService, MockBackend], (service: NebulaService, mockBackend: MockBackend) => {
      let connections = mockBackend.connections;
      connections.subscribe((con) => {
        let url = environment.nebulaApi + 'test';
        expect(con.request.url).toEqual(url);
      });
      service.put('test', {"test": "value"});
    })));

  it('It should send a put request to the nebula api',
    async(inject([NebulaService, MockBackend], (service: NebulaService, mockBackend: MockBackend) => {
      let connections = mockBackend.connections;
      connections.subscribe((con) => {
        expect(con.request.method).toEqual(2);
      });
      service.put('test', {"test": "value"});
    })));

  it('It should send put params to the nebula api',
    async(inject([NebulaService, MockBackend], (service: NebulaService, mockBackend: MockBackend) => {
      let connections = mockBackend.connections;
      let params = {"test": "value"};
      connections.subscribe((con) => {
        let body = JSON.parse(con.request.getBody());
        expect(body).toEqual(params);
      });
      service.put('test', params);
    })));


  it('It should parse the put response',
    async(inject([NebulaService, MockBackend], (service: NebulaService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify({message: "test response"})
            })));
        });
      service.put('test', {test: 'params'}).subscribe((response) => {
        expect(response.message).toEqual('test response');
      });
    })));

  it('It should prepend the nebula api url to delete requests',
    async(inject([NebulaService, MockBackend], (service: NebulaService, mockBackend: MockBackend) => {
      let connections = mockBackend.connections;
      connections.subscribe((con) => {
        let url = environment.nebulaApi + 'test';
        expect(con.request.url).toEqual(url);
      });
      service.delete('test');
    })));

  it('It should send a delete request to the nebula api',
    async(inject([NebulaService, MockBackend], (service: NebulaService, mockBackend: MockBackend) => {
      let connections = mockBackend.connections;
      connections.subscribe((con) => {
        expect(con.request.method).toEqual(3);
      });
      service.delete('test');
    })));


  it('It should parse the delete response',
    async(inject([NebulaService, MockBackend], (service: NebulaService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify({message: "test response"})
            })));
        });
      service.delete('test').subscribe((response) => {
        expect(response.message).toEqual('test response');
      });
    })));

});
