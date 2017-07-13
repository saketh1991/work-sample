import { TestBed, async, inject } from '@angular/core/testing';
import { Injectable, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { TdDialogService } from '@covalent/core';
import { MaterialModule, MdSnackBar } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject} from "rxjs";
import { TestingModule } from "../../../../testing/testing.module";

import { Response, ResponseOptions, BaseResponseOptions, Headers, Http, HttpModule, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ErrorDialogService } from './error-dialog.service';

describe('error dialog service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
       MockBackend,
       ErrorDialogService,
       TdDialogService,
       BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions, MockConnection]
        },
      ],
      imports: [
       MaterialModule.forRoot(),
       HttpModule,
       TestingModule
      ],
   });
  });

  it('It should define the service',
    inject([ErrorDialogService], (service:ErrorDialogService) => {
      expect(service).toBeDefined()
  }));

  it('should render a response error', inject([ErrorDialogService, MockBackend], (service: ErrorDialogService, mockBackend: MockBackend) => {
    const dialogBox = TestBed.get(TdDialogService);

    let options = new ResponseOptions ({
      body: { },
      status: 0,
      url: '/some/url',
      statusText: 'some status'
    });
    let res = new Response(options); 
    let read: ViewContainerRef;
    service.displayError(read, 'someError', res).subscribe(response => {
      expect(response).toBeTruthy(); 
    });
  }));

  it('should render a response error', inject([ErrorDialogService, MockBackend], (service: ErrorDialogService, mockBackend: MockBackend) => {
    const dialogBox = TestBed.get(TdDialogService);

    let options = new ResponseOptions ({
      body: JSON.stringify(
            { message: 'someError message'
      }),
      status: 404,
      url: '/some/url',
      statusText: 'some status'
    });
    let res = new Response(options); 
    let read: ViewContainerRef;
    service.displayError(read, 'someError', res).subscribe(response => {
      expect(response).toBeTruthy(); 
    });
  }));

  it('should render a response error', inject([ErrorDialogService, MockBackend], (service: ErrorDialogService, mockBackend: MockBackend) => {
    const dialogService = TestBed.get(TdDialogService);

    let options = new ResponseOptions ({
      status: 404,
      url: '/some/url',
      statusText: 'some status'
    });
    let res = new Response(options); 
    let read: ViewContainerRef;
    service.displayError(read, 'someError', res).subscribe(response => {
      expect(dialogService.confirmOpen).toBeTruthy();
    });
  }));

  it('should render a response error', inject([ErrorDialogService, MockBackend], (service: ErrorDialogService, mockBackend: MockBackend) => {
    const dialogService = TestBed.get(TdDialogService);

    let someError = new Error('someError'); 
    let read: ViewContainerRef;
    service.displayError(read, 'someError', someError).subscribe(response => {
      expect(dialogService.confirmOpen).toBeTruthy();
    }); 
  }));   
}); 