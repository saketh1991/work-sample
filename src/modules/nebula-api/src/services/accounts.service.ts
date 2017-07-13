import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { TokenService } from './token.service';
import { HttpService } from '../../../../app/stepper/services/http.service';

@Injectable()
export class AccountsService {
  private properties: Subject<any> = new Subject();
  propertiesLoaded: boolean = false;

  constructor(private _httpService: HttpService,
              private _tokenService: TokenService) { }

  /**
   * Load the account properties
   */
  loadProperties(): void {
    // don't attempt to load when there is no session
    if (!this._tokenService.hasSession()) {
      return;
    }

    this.propertiesLoaded = true;

    this._httpService.get('accounts/property').subscribe((properties: any) => {
      this.properties.next(properties);
    });
  }

  /**
   * Get details on current user
   *
   * http://sdlc7609.labs.teradata.com:8080/job/tdmc-restful/lastSuccessfulBuild/
   * artifact/rest/raml/tdmcapi.html#accounts_property_get
   *
   * @returns {any}
   */
  getProperty(): any {
    if (!this.propertiesLoaded) {
      this.loadProperties();
    }

    return this.properties.asObservable();
  }

  /**
   * Resets the cached account properties
   */
  resetProperties(): void {
    this.properties.next(false);
  }

  /**
   * Gets a list of current system users
   *
   * @returns {any}
   */
  getUsers(): Observable<any> {
    return this._httpService.get('accounts/users');
  }

  /**
   * Creates a new user
   *
   * @param email
   * @param roles,
   * @param password
   * @returns {any}
   */
  createUser(email: string, roles: Array<string>, password: string): Observable<any> {
    return this._httpService.post('accounts/users', {
      'username': email,
      'password': password,
      'roles': roles,
    });
  }

  /**
   * Deletes a user (does nothing yet)
   *
   * @param email
   */
  deleteUser(email: string): string {
    // delete the user once the api is ready
    return email;
  }

  /**
   * Encodes the email into a UID
   *
   * @param email
   * @returns {string}
   */
  getUid(email: string): string {
    return btoa(email);
  }

  /**
   * Finds the user by the UID
   *
   * At this point this just creates an object that has the decoded email
   *
   * @param uid
   * @returns {{username: string}}
   */
  getUserById(uid: string): any {
    const email: string = atob(uid);
    return {
      'username': email,
    };
  }

  /**
   * Lists all available subnets from a specified vpc
   *
   * @param provider
   * @param credential
   * @param vpcId
   * @returns {any}
   */
  getSubnets(provider: string, region: string, credential: string, vpcId: string): Observable<any> {
    const params: any = {
      'region': region.toLowerCase(),
      'credential': credential.toLowerCase(),
      'vpc_id': vpcId.toLowerCase(),
    };

    return this._httpService.post(`accounts/property/provider/${provider.toLowerCase()}/subnets`, params);
  }

  /**
   * List all the vpc available based on credential and region, will return the vpc name, vpc id and cidr for each vpc
   *
   * @param provider
   * @param region
   * @param credential
   * @returns {any}
   */
  getVpcs(provider: string, region: string, credential: string): Observable<any> {
    const params: any = {
      'region': region,
      'credential': credential,
    };

    return this._httpService.post(`accounts/property/provider/${provider}/vpcs`, params);
  }

  /**
   * Fetches the users default timezone and a list of all available timezones
   * @returns {any}
   */
  getTimezones(): Observable<any> {
    return this._httpService.get('accounts/property/timezone');
  }

  /**
   * Fetches a provider's available CIDR's by netmask
   *
   * @param   provider    {string}
   * @param   region      {string}
   * @param   credential  {string}
   * @param   vpc_id      {string}
   * @param   netmask     {number}
   *
   * @returns {any}
   */
  getAvailableCidrsWithNetmask(provider: string,
                               region: string,
                               credential: string,
                               vpcId: string,
                               netmask: number): Observable<any> {
    const path: string = `accounts/property/provider/${provider.toLowerCase()}/available-cidrs-with-netmask`;
    const params: any = {
      'region': region.toLowerCase(),
      'credential': credential.toLowerCase(),
      'vpc_id': vpcId.toLowerCase(),
      'netmask': netmask,
    };

    return this._httpService.post(path, params);
  }

  /**
   * Fetches a provider's available CIDR's by number of IP addresses needed
   *
   * @param   provider    {string}
   * @param   region      {string}
   * @param   credential  {string}
   * @param   vpc_id      {string}
   * @param   count       {number}
   *
   * @returns {any}
   */
  getAvailableCidrsWithCount(provider: string,
                             region: string,
                             credential: string,
                             vpcId: string,
                             count: number): Observable<any> {
    const path: string = `accounts/property/provider/${provider.toLowerCase()}/available-cidrs-with-count`;
    const params: any = {
      'region': region.toLowerCase(),
      'credential': credential.toLowerCase(),
      'vpc_id': vpcId.toLowerCase(),
      'number_of_ip_addresses_needed': count,
    };

    return this._httpService.post(path, params);
  }
}
