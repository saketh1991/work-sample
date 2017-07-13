/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {
  Response, ResponseOptions, Headers, Http, HttpModule,
  BaseRequestOptions
} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

import {NebulaService} from './nebula.service';
import {AccountsService} from './accounts.service';
import {TokenService} from "./token.service";
import {environment} from '../../../../environments/environment';
import {HttpService} from "../../../../app/stepper/services/http.service";
import {Apiurl} from "../../../../app/api-url";

describe('AccountsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        },
        AccountsService,
        NebulaService,
        TokenService,
        HttpService,
        Apiurl
      ],
    });
  });

  it('It should construct',
    async(inject([AccountsService, MockBackend], (service: AccountsService, mockBackend: MockBackend) => {
      expect(service).toBeDefined()
    })));

  it('It should get property',
    async(inject([AccountsService, MockBackend], (service: AccountsService, mockBackend: MockBackend) => {
      let connections = mockBackend.connections;
      connections.subscribe((con) => {
        expect(con.request.method).toEqual(0);
        expect(con.request.url.indexOf('accounts/property')).toBeGreaterThan(-1);
      });
      service.getProperty();
    })));

  it('It should get users',
    async(inject([AccountsService, MockBackend], (service: AccountsService, mockBackend: MockBackend) => {
      let connections = mockBackend.connections;
      connections.subscribe((con) => {
        expect(con.request.method).toEqual(0);
        expect(con.request.url.indexOf('accounts/users')).toBeGreaterThan(-1);
      });
      service.getUsers();
    })));

  it('It should create a user',
    async(inject([AccountsService, MockBackend], (service: AccountsService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify({message: "User added successfully"})
            })));
        });

      service.createUser('forrest.lyman@teradata.com', ["admin"], "nebula").subscribe(response => {
        expect(response.message).toBeDefined();
      });
    })));

  it('It should delete a user',
    async(inject([AccountsService, MockBackend], (service: AccountsService, mockBackend: MockBackend) => {
      let email = service.deleteUser('test@email.com');
      expect(email).toEqual('test@email.com');
    })));

  it('It should create and read a UID',
    async(inject([AccountsService, MockBackend], (service: AccountsService, mockBackend: MockBackend) => {
      let email = 'forrest.lyman@teradata.com';
      let uid = service.getUid(email);

      // make sure it didnt just return the email
      expect(uid).not.toEqual(email);

      let user = service.getUserById(uid);

      expect(user.username).toEqual(email);
    })));


  it('It should get subnets',
    async(inject([AccountsService, MockBackend], (service: AccountsService, mockBackend: MockBackend) => {
      let params = {
        'region': 'region',
        'credential': 'credential',
        'vpc_id': 'vpc-id',
      };
      let connections = mockBackend.connections;
      connections.subscribe((con) => {
        expect(con.request.method).toEqual(1);
        expect(con.request.url.indexOf('accounts/property/provider/aws/subnets')).toBeGreaterThan(-1);

        let body = JSON.parse(con.request.getBody());
        expect(body).toEqual(params);
      });
      service.getSubnets('aws',params['region'],params['credential'],params['vpc_id']);
    })));

  it('It should get vpcs',
    async(inject([AccountsService, MockBackend], (service: AccountsService, mockBackend: MockBackend) => {
      let params = {
        'region': 'region',
        'credential': 'credential'
      };
      let connections = mockBackend.connections;
      connections.subscribe((con) => {
        expect(con.request.method).toEqual(1);

        expect(con.request.url.indexOf('accounts/property/provider/aws/vpcs')).toBeGreaterThan(-1);

        let body = JSON.parse(con.request.getBody());
        expect(body).toEqual(params);
      });
      service.getVpcs('aws',params['region'],params['credential']);
    })));

  it('It should get timezones',
    async(inject([AccountsService, MockBackend], (service: AccountsService, mockBackend: MockBackend) => {
      let connections = mockBackend.connections;
      connections.subscribe((con) => {
        expect(con.request.method).toEqual(0);
        expect(con.request.url.indexOf('accounts/property/timezone')).toBeGreaterThan(-1);
      });
      service.getTimezones();
    })));
});

