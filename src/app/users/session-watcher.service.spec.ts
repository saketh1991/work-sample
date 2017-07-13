/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SessionWatcherService } from './session-watcher.service';

import {Router} from "@angular/router";
import {TokenService} from "../../modules/nebula-api/src/services/token.service";
import {MdSnackBar} from "@angular/material";

import { TestingModule } from "../../../testing/testing.module";


describe('SessionWatcherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule
      ],
      providers: [
        SessionWatcherService
      ]
    });
  });

  it('should redirect to login when the token is invalid', inject([SessionWatcherService], (service: SessionWatcherService) => {
    let token = TestBed.get(TokenService);
    token.testSession();
    service.watchToken();
    token.destroySession();

    let router = TestBed.get(Router);
    expect(router.url[0]).toEqual('/login');
  }));

  it('should dismiss the snackbar', inject([SessionWatcherService], (service: SessionWatcherService) => {
    let snackbar = TestBed.get(MdSnackBar);
    service.snackbar = snackbar.open('test');
    service.hideNotification();
    expect(snackbar.ref.visible).toBeFalsy();
  }));


});
