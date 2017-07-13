import { Injectable } from '@angular/core';
import { TestBed, async, inject } from '@angular/core/testing';
import { MaterialModule, MdSnackBar, MdSnackBarRef } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import { TestingModule } from "../../../../testing/testing.module";
import 'rxjs/add/operator/map'; 

import { MessagingService } from './messaging.service';

describe('MessagingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
       MessagingService,
      ],
      imports: [
          BrowserAnimationsModule,
          TestingModule
      ],
    });
  });

  it('It should define the service',
    async(inject([MessagingService], (service:MessagingService) => {
      expect(service).toBeDefined()
  })));

  it('should show the message successfully', async(inject([MessagingService], (service: MessagingService) => {
   
    service.showMessage('message showed successfully');
     let snackBar = TestBed.get(MdSnackBar);
     expect(snackBar.ref.visible).toBeTruthy(); 
  })));

}); 
