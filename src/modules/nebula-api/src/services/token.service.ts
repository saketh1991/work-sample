/* tslint:disable:no-null-keyword */
/* tslint:disable:no-string-literal */

import { Injectable, EventEmitter } from '@angular/core';
import { Token } from './token';

@Injectable()
export class TokenService {
  private sessionKey: string = 'user_session';

  tokenState$: EventEmitter<boolean> = new EventEmitter();

  /**
   * Set the current user session
   *
   * @param token, JWT token
   * @param data, array of data to attach to the session
   */
  setSession(token: any, data: any): void {
    // Clear the session
    this.destroySession();

    const tokenData: any = this.parseJwt(token);

    if (!tokenData) {
      return; // invalid token
    }

    data['uid'] = tokenData.identity;

    const sessionData: any = {
      'data': data,
      'token': token,
      'expires': parseInt(tokenData.exp, 10),
    };

    this.saveSession(sessionData);
  }

  /**
   * Save the session to local storage
   *
   * @param session
   */
  saveSession(session: Token): void {
    // convert the session to json string
    const jsonString: string = JSON.stringify(session);

    // encode the session data
    const encodedSession: any = window.btoa(jsonString);

    // persist in local storage
    localStorage.setItem(this.sessionKey, encodedSession);
  }

  /**
   * Determines if there is an active user session
   */
  hasSession(): boolean {
    return this.getSession() !== null;
  }

  /**
   * Fetch the current session
   */
  getSession(): any {
    const session: any = localStorage.getItem(this.sessionKey);

    if (!session || session === null) {
      this.tokenState$.emit(false);
      return null;
    }

    // decode session
    const decoded: any = window.atob(session);

    // parse session data
    const sessionData: any = JSON.parse(decoded);

    // determine if the session has expired, destroy it if it has
    const timestamp: any = Math.floor(Date.now() / 1000);

    if (timestamp > + sessionData.expires) {
      this.tokenState$.emit(false);
      this.destroySession();
      return null;
    }

    this.tokenState$.emit(true);

    return sessionData;
  }

  /**
   * Fetch the original JWT token
   *
   * @returns {any}
   */
  getToken(): any {
    const session: any = this.getSession();

    if (!session) {
      return null;
    }

    return session.token;
  }

  /**
   * Fetch the data that is associated with the user session
   *
   * @param key, optional
   */
  getData(key?: any): any {
    const session: any = this.getSession();

    if (!session) {
      return null;
    }

    return key ? session.data[key] : session.data;
  }

  /**
   * Destroy the current session
   */
  destroySession(): void {
    localStorage.removeItem(this.sessionKey);
  }

  /**
   * Parse the JWT
   *
   * @param token
   * @returns {any}
   */
  parseJwt(token: any): any {
    const tokenData: any = token.split('.')[1];

    try {
      return JSON.parse(window.atob(tokenData));
    } catch (e) {
      return null;
    }
  };
}
