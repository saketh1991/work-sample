import { TestBed, async, inject} from '@angular/core/testing';
import {
  Response, ResponseOptions, Headers, Http, HttpModule,
  BaseRequestOptions
} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import { Apiurl } from '../app/api-url';
import { Injectable,Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { loginService } from './login.service';


describe('loginService', () => {
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
        loginService,
        Apiurl
      ],
      imports: [
        HttpModule
      ],
    });
  });

 it('It should get the data using the account',
    async(inject([loginService, MockBackend], (service: loginService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify({account: "got the account successfully"})
            })));
        });

      service.accounts().subscribe(response => {
        expect(response.account).toEqual('got the account successfully');
      });
  }))); 

  it('It should create an account',
    async(inject([loginService, MockBackend], (service: loginService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify({account: "account created successfully"})
            })));
        });

      service.createAccount().subscribe(response => {
        expect(response.account).toEqual('account created successfully');
      });
  }))); 
}); 