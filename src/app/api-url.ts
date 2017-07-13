import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class Apiurl {
  public api(): String {
    return environment.nebulaApi;
  }
}
