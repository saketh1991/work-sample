/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TokenService } from './token.service';
import {TokenServiceStub} from "../../../../../testing/stubs/token-stubs";

describe('TokenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TokenService,
        TokenServiceStub
      ]
    });
    //window.localStorage.clear();
  });

  it('should ...', inject([TokenService], (service: TokenService) => {
    expect(service).toBeTruthy();
  }));

  it('Should parse JWT data', inject([TokenService], (service: TokenService) => {
    let tokenStub = TestBed.get(TokenServiceStub);
    let tokenData = service.parseJwt(tokenStub.mockToken(false));
    expect(tokenData.identity).toBe('tester');
  }));

  it('Invalid token should return false', inject([TokenService], (service: TokenService) => {
    expect(service.setSession('junk-token', {})).toBeFalsy();
  }));

  it('Valid token should create session', inject([TokenService], (service: TokenService) => {
    let tokenStub = TestBed.get(TokenServiceStub);
    service.setSession(tokenStub.mockToken(false), {});
    expect(service.getSession()).toBeTruthy();
  }));

  it('Expired token should not create session', inject([TokenService], (service: TokenService) => {
    let tokenStub = TestBed.get(TokenServiceStub);
    service.setSession(tokenStub.mockToken(true), {});
    expect(service.getSession()).toBeFalsy();
  }));

  it('Has session should return true if a session has been started', inject([TokenService], (service: TokenService) => {
    let tokenStub = TestBed.get(TokenServiceStub);
    service.setSession(tokenStub.mockToken(false), {});
    expect(service.getSession()).toBeTruthy();
  }));


  it('Destroy session should kill current session', inject([TokenService], (service: TokenService) => {
    let tokenStub = TestBed.get(TokenServiceStub);
    service.setSession(tokenStub.mockToken(false), {});
    service.destroySession();
    expect(service.getSession()).toBeFalsy();
  }));

  it('Get token should return original token', inject([TokenService], (service: TokenService) => {
    let tokenStub = TestBed.get(TokenServiceStub);
    let token = tokenStub.mockToken(false);
    service.setSession(token, {});
    expect(service.getToken()).toBe(token);
  }));

  it('Get token should return null if there is no session', inject([TokenService], (service: TokenService) => {
    service.destroySession();
    expect(service.getToken()).toBeFalsy();
  }));

  it('Get data should return data you pass to the session', inject([TokenService], (service: TokenService) => {
    let tokenStub = TestBed.get(TokenServiceStub);
    let token = tokenStub.mockToken(false);
    service.setSession(token, {'test': 'value'});
    expect(service.getData('test')).toBe('value');
  }));

  it('Get data should return null if there is no session', inject([TokenService], (service: TokenService) => {
    service.destroySession();
    expect(service.getData()).toBeFalsy();
  }));

  it('Has session should return false if no session has been set', inject([TokenService], (service: TokenService) => {
    service.destroySession();
    expect(service.hasSession()).toBeFalsy();
  }));
});
