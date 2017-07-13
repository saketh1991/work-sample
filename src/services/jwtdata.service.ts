import {Injectable} from '@angular/core';
/* service for the session storage*/
export interface IUser {
  username?: string;
  password?: string;
  email?: string;
  local?: boolean;
  admin?: boolean;
  appCenterAdmin?: boolean;
  groups?: Array<string>;
  display_name?: string;
  access_token?: string;
  expires_at?: number;
}

export interface IJWTData {
  tokenId: string;
  data: IUser;
  username: string;
  envid: string;
  keyname: string;
  publickey: string;
}

@Injectable()
export class JWTDataService {

  /*get tokenId(): string {
   return localStorage.getItem('token_id');
   }
   get username():string{

   return localStorage.getItem('username');
   }

   get data(): IUser {
   return JSON.parse(localStorage.getItem('data'));
   }

   set redirect(url: string) {
   localStorage.setItem('redirect', url);
   }
   get redirect(): string {
   return localStorage.getItem('redirect');
   }
   clearRedirect(): void {
   localStorage.removeItem('redirect');
   }

   isTokenExpired(): boolean {
   const token: string = localStorage.getItem('token_id');
   const expiredTime: Date = this.data ? new Date(this.data.expires_at) : undefined;
   return !token || (expiredTime ? (Date.now() > expiredTime.getTime()) : true);
   }

   /* store(jwtData: IJWTData): void {
   // localStorage.setItem('data', JSON.stringify(jwtData.data));
   localStorage.setItem('token_id', jwtData.tokenId);
   localStorage.setItem('username', jwtData.username);
   }*/
  /*  store(token,username): void {
   // localStorage.setItem('data', JSON.stringify(jwtData.data));
   localStorage.setItem('token_id', token);
   localStorage.setItem('username', username);
   }

   clear(): void {
   //localStorage.removeItem('data');
   localStorage.removeItem('token_id');
   localStorage.removeItem('username');
   }*/
  //noinspection JSMethodCanBeStatic
  get tokenId(): string {
    return sessionStorage.getItem('token_id');
  }

  //noinspection JSMethodCanBeStatic
  get username(): string {

    return sessionStorage.getItem('username');
  }

  //noinspection JSMethodCanBeStatic
  get data(): IUser {
    return JSON.parse(sessionStorage.getItem('data'));
  }

  //noinspection JSMethodCanBeStatic
  set redirect(url: string) {
    sessionStorage.setItem('redirect', url);
  }

  //noinspection JSMethodCanBeStatic
  get redirect(): string {
    return sessionStorage.getItem('redirect');
  }

  //noinspection JSMethodCanBeStatic
  clearRedirect(): void {
    sessionStorage.removeItem('redirect');
  }

  isTokenExpired(): boolean {
    const token: string = sessionStorage.getItem('token_id');
    const expiredTime: Date = this.data ? new Date(this.data.expires_at) : undefined;
    return !token || (expiredTime ? (Date.now() > expiredTime.getTime()) : true);
  }

  /*store(jwtData: IJWTData): void {
   // localStorage.setItem('data', JSON.stringify(jwtData.data));
   sessionStorage.setItem('token_id', jwtData.tokenId);
   sessionStorage.setItem('username', jwtData.username);
   }*/

  //noinspection JSMethodCanBeStatic
  store(token, username): void {
    // localStorage.setItem('data', JSON.stringify(jwtData.data));
    sessionStorage.setItem('token_id', token);
    sessionStorage.setItem('jwt_token', token);
    sessionStorage.setItem('username', username);
  }

  //noinspection JSMethodCanBeStatic
  storeEnvid(envid): void {
    sessionStorage.setItem('env_id', envid);


  }

  //noinspection JSMethodCanBeStatic
  storeSecurity(keyname, publickey): void {
    sessionStorage.setItem('key_name', keyname);
    sessionStorage.setItem('public_key', publickey);


  }

  //noinspection JSMethodCanBeStatic
  clearSecurity(): void {
    sessionStorage.removeItem('key_name');
    sessionStorage.removeItem('public_key');

  }


  //noinspection JSMethodCanBeStatic
  clear(): void {
    //localStorage.removeItem('data');
    sessionStorage.removeItem('token_id');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('jwt_token')
  }

  //noinspection JSMethodCanBeStatic
  clearEnvid(): void {
    sessionStorage.removeItem('env_id');

  }


}

