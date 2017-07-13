import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpService } from './http.service';
import { BuildPlan, Sizing, Specifics } from '../+models';

@Injectable()
export class BuildPlanService {
  constructor(private _httpService: HttpService) { }

  getBundles(): Observable<any> {
    return this._httpService.get('providers/aws/bundles');
  }

  getProductDetails(productId: string): Observable<any> {
    return this._httpService.get(`providers/aws/products/${productId}`);
  }

  getProductSizings(productId: string): Observable<Sizing[]> {
    return this._httpService.get(`providers/aws/products/${productId}/sizing`).map(Sizing.fromJSON);
  }

  getProductSpecifics(productId: string): Observable<Specifics> {
    return this._httpService.get(`providers/aws/products/${productId}/product_specifics`).map(Specifics.fromJSON);
  }

  getInstanceDetails(): Observable<any> {
    return this._httpService.get('providers/aws/instances');
  }

  getRegionAvailability(): Observable<any> {
    return this._httpService.get('providers/aws/regionavailability');
  }

  createPlan(plan: BuildPlan): Observable<any> {
    return this._httpService.post('plans', plan.toCreatePayload());
  }

  executePlan(plan: BuildPlan): Observable<any> {
    return this._httpService.post('environments', plan.toExecutionPayload());
  }
}
