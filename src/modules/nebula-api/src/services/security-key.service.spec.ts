/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {
  Response, ResponseOptions, Headers, Http, HttpModule,
  BaseRequestOptions
} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

import {NebulaService} from './nebula.service';
import {SecurityKeyService} from './security-key.service';
import {environment} from '../../../../environments/environment';
import {TestingModule} from "../../../../../testing/testing.module";
import {HttpService} from "../../../../app/stepper/services/http.service";
import {Apiurl} from "../../../../app/api-url";

describe('SecurityKeyService', () => {
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
        SecurityKeyService,
        NebulaService,
        HttpService,
        Apiurl
      ],
    });
  });

  it('It should construct',
    async(inject([SecurityKeyService, MockBackend], (service: SecurityKeyService, mockBackend: MockBackend) => {
      expect(service).toBeDefined()
    })));

  it('It should list keys',
    async(inject([SecurityKeyService, MockBackend], (service: SecurityKeyService, mockBackend: MockBackend) => {
      let connections = mockBackend.connections;
      connections.subscribe((con) => {
        expect(con.request.method).toEqual(0);
        expect(con.request.url.indexOf('accounts/property/securitykeys')).toBeGreaterThan(-1);
      });
      service.list();
    })));

  it('It should delete a key',
    async(inject([SecurityKeyService, MockBackend], (service: SecurityKeyService, mockBackend: MockBackend) => {
      let connections = mockBackend.connections;
      connections.subscribe((con) => {
        expect(con.request.method).toEqual(3);
        expect(con.request.url.indexOf('accounts/property/securitykeys/test')).toBeGreaterThan(-1);
      });
      service.delete('test');
    })));
});

