import { TestBed, async, inject} from '@angular/core/testing';
import { Response, Http, HttpModule } from '@angular/http';
import { Observable} from 'rxjs/Observable';
import { CovalentHttpModule } from '@covalent/http';

import { JWTDataService } from './jwtdata.service';

describe('JWTDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JWTDataService
      ],
      imports: [
        CovalentHttpModule.forRoot()
      ]
    });
  });

  let service; 
  beforeEach(inject([JWTDataService], (svc: JWTDataService) => {
    service = svc;
  }))

  it('should...', (() => {
    expect(service).toBeTruthy();
  }));

  it('should get the token_id using token_id method', (() => {
   
   sessionStorage.setItem('token_id', '123');
   let token_id = service.tokenId;
   expect(token_id).toEqual('123');
  }));

  it('should get the username using username method', (() => {
   
   sessionStorage.setItem('username', 'JOHN DEO');
   let username = service.username;
   expect(username).toEqual('JOHN DEO');
  }));

  it('should get the data using data method', (() => {
   let someObject = JSON.stringify({ x: 5, y: 6 });
   sessionStorage.setItem('data', someObject);
   let data = service.data;
   expect(data).toEqual(JSON.parse(someObject));

  }));

  it('should set the url using redirect method', (() => {
   
   service.redirect = 'someURL';
   let Url = sessionStorage.getItem('redirect');
   expect(Url).toEqual('someURL');

  }));

  it('should get the url using redirect method', (() => {

   let someUrl = sessionStorage.setItem('redirect', 'someDummyUrl');
   let url = service.redirect;
   expect(url).toEqual('someDummyUrl');

  }));

  it('should get the url using redirect method', (() => {

   let sometoken = sessionStorage.setItem('token_id', '123');
   let someBool = service.isTokenExpired();
   expect(someBool).toEqual(false);
  }));

  it('should get the key name using storeSecurity method', (() => {
    
   service.storeSecurity('123', '456');
   let key_name = sessionStorage.getItem('key_name');
   expect(key_name).toEqual('123');
  }));

  it('should get the key name using storeSecurity method', (() => {
    
   service.storeSecurity('123', '456');
   let public_key = sessionStorage.getItem('public_key');
   expect(public_key).toEqual('456');
  }));

  it('should remove an item after using the clear method', (() => {
  
   let redirect = sessionStorage.setItem('redirect', '123');
   service.clearRedirect(redirect);
   expect(redirect).toBeUndefined();
  }));

  it('should get the token id using store method', (() => {
  
   service.store('123', 'JOHN SMITH');
   let token_Id = sessionStorage.getItem('token_id');
   expect(token_Id).toEqual('123');
  }));

  it('should get the jwt_token using store method', (() => {
  
   service.store('123', 'JOHN SMITH');
   let jwt_token = sessionStorage.getItem('jwt_token');
   expect(jwt_token).toEqual('123');
  }));

  it('should get the username using store method', (() => {
  
   service.store('123', 'JOHN SMITH');
   let username = sessionStorage.getItem('username');
   expect(username).toEqual('JOHN SMITH');
  }));

  it('should set the env_id using storeEnvid method', (() => {
  
   service.storeEnvid('123');
   let envid = sessionStorage.getItem('env_id');
   expect(envid).toEqual('123');
  }));

  it('should remove the key name using clear security method', (() => {
   
   sessionStorage.setItem('key_name', 'someName');
   service.clearSecurity();
   let key_name = sessionStorage.getItem('key_name');
   expect(key_name).toEqual(null);
  }));

  it('should remove the key name using clear security method', (() => {
   
   sessionStorage.setItem('public_key', '123');
   service.clearSecurity();
   let public_key = sessionStorage.getItem('public_key');
   expect(public_key).toEqual(null);
  }));

  it('should remove the token_id using clear method', (() => {
   
   sessionStorage.setItem('token_id', '123');
   service.clear();
   let token_id = sessionStorage.getItem('token_id');
   expect(token_id).toEqual(null);
  }));

  it('should remove the username using clear method', (() => {
   
   sessionStorage.setItem('username', 'Tommy Tomaye');
   service.clear();
   let username = sessionStorage.getItem('username');
   expect(username).toEqual(null);
  }));

  it('should remove the jwt_token using clear method', (() => {
   
   sessionStorage.setItem('jwt_token', '123');
   service.clear();
   let jwt_token = sessionStorage.getItem('jwt_token');
   expect(jwt_token).toEqual(null);
  }));

  it('should remove the jwt_token using clear method', (() => {
   
   sessionStorage.setItem('env_id', '123');
   service.clearEnvid();
   let env_id = sessionStorage.getItem('env_id');
   expect(env_id).toEqual(null);
  }));
}); 



 


