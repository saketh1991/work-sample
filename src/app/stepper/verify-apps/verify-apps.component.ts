/* tslint:disable: no-string-literal */

import { Component, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';
import { TdStepComponent, StepState } from '@covalent/core';
import { Observable } from 'rxjs';

import { Bundle, BuildPlan, CloudCredential, STORAGE_TYPES } from '../+models';
import { InstanceType } from '../../dashboard/+models';

import { BuildPlanService,
         CloudCredentialService,
         ErrorDialogService,
         EulaService,
         LoaderService,
         tooltipservice } from '../services';
import { PlanService } from '../../dashboard/services';

import { NewCredentialDialogComponent } from '../+dialog';

import { PRODUCT_TYPES } from '../+models/app-config';

@Component({
  selector: 'app-verify-apps',
  templateUrl: './verify-apps.component.html',
  styleUrls: ['./verify-apps.component.scss'],
  viewProviders: [ CloudCredentialService ],
})
export class VerifyAppsComponent implements AfterViewInit {
  private _credentials: any[];

  /** current in-session plan attributes for the plan summary */
  bundle: Bundle = Bundle.load();
  plan: BuildPlan = new BuildPlan();
  planId: any;
  planJSON: any;

  /** stepper data */
  credentialName: string;
  licenses: any[];

  /** license verification indicator */
  isVerifying: boolean;
  showReverify: boolean;

  /** tooltip */
  // tslint:disable:variable-name
  tooltip_content: any[];
  tooltip_display: any;
  // tslint:enable:variable-name

  isLoading: boolean = true;
  errors: Array<any>;
  requestsInProgress: number;

  extraApplications: Array<any> = [
    { id: 'td_dm_1st_edition', name: 'Data Mover', type: 'datamover' },
  ];

  policyDocument: any;
  principalArn: string;

  /** steps */
  @ViewChild('step1') step1: TdStepComponent;
  @ViewChild('step2') step2: TdStepComponent;

  constructor(private _buildPlanService: BuildPlanService,
              private _cloudCredentialService: CloudCredentialService,
              private _eulaService: EulaService,
              private _loaderService: LoaderService,
              private _errorDialogService: ErrorDialogService,
              private _dialogService: MdDialog,
              private _viewContainerRef: ViewContainerRef,
              private _router: Router,
              private _route: ActivatedRoute,
              private _planService: PlanService,
              private _tooltip: tooltipservice) {

    this.credentialName = sessionStorage.getItem('cloudname');
  }

  ngAfterViewInit(): void {
    this.loadCredentials();

    this._tooltip.query().subscribe((res: any[]): void => {
      this.tooltip_content = res;
    });

    this._route.queryParams.subscribe((params: Params) => {
      this.planId = params['planId'];
      this.getStepInformation();
    });
  }

  canContinue(): boolean {
    return !!this.credentialName;
  }

  stopPropagation(step: any): void {
    for (let tooltip of this.tooltip_content['builplan']) {
      if (tooltip['id'] === step) {
        this.tooltip_display = tooltip['Tooltip'];
      }
    }
  }

  isStepPending(step: TdStepComponent): boolean {
    return step.state !== StepState.Complete;
  }

  continueStep1(): void {
    this.saveSettings();
    this.step1.state = StepState.Complete;
    this.step2.disabled = false;
    this.step2.open();
  }

  continueStep2(): void {
    this.saveSettings();
    this.step2.state = StepState.Complete;
    this.step2.close();
  }

  saveAndContinue(): void {
    this._router.navigate(['/dashboard/tddbconfig']);
  }

  addNewCredential(): void {
    const viewContainerRef: ViewContainerRef = this._viewContainerRef;
    const dialogRef: MdDialogRef<NewCredentialDialogComponent> =
      this._dialogService.open(NewCredentialDialogComponent, { viewContainerRef });
    dialogRef.componentInstance.policyDocument = this.policyDocument;
    dialogRef.componentInstance.principalArn = this.principalArn;

    const errorHandler: any = (err: any) => {
      this.handleError(err, 'Error saving credential', () => this.addNewCredential());
    };

    dialogRef.afterClosed().subscribe((res: any) => {
      if (!res) {
        return;
      }

      if (res.error) {
        errorHandler(res.error);
        return;
      }

      this.loadCredentials();
    }, errorHandler);
  }

  reverify(): void {
    this.verifyLicenses();
  }

  get credentials(): any[] {
    return this._credentials;
  }

  set credentials(credentials: any[]) {
    this._credentials = credentials;
  }

  get licenseNames(): string[] {
    if (!this.licenses) {
      return undefined;
    }
    return this.licenses.map((l: any) => l.name);
  }

  get licenseStatuses(): string[] {
    if (!this.licenses) {
      return undefined;
    }
    return this.licenses.map((l: any) => l.status);
  }

  private saveSettings(): void {
    sessionStorage.setItem('cloudname', this.credentialName);
  }

  private loadCredentials(): void {
    this.isLoading = true;

    Observable.forkJoin(
      this._cloudCredentialService.get(),
      this._cloudCredentialService.getRolesPolicy(),
    ).subscribe(
      (response: any): void => {
        const [credentialsResponse, policyResponse]: any = response;
        this.isLoading = false;
        this.credentials = CloudCredential.fromJSON(credentialsResponse.cred);
        this.policyDocument = JSON.stringify({
          policy_document: policyResponse.resource_deployment.policy_document},
          undefined,
          2);
        this.principalArn = policyResponse.resource_deployment.assume_policy_document.Statement[0].Principal.AWS;
      },
      (err: any): void => {
        this.handleError(err, 'Error loading credentials', () => this.loadCredentials);
      }
    );
  }

  private verifyLicenses(): void {
    this.isVerifying = true;

    const planId: string = sessionStorage.getItem('plan_id');

    this._eulaService.verifyStatus(planId, this.credentialName).subscribe(
      (status: any) => this.addProductDetails(status),
      (err: any) => this.handleError(err, 'Error verifying licenses', () => this.verifyLicenses())
    );
  }

  private addProductDetails(status: any): void {
    // create one observable per product returned from status
    const detail$: Observable<any>[] = status.td_product_ids
      .map((s: any) => this._buildPlanService.getProductDetails(s.td_product_id));

    // wait until all the requests complete and transform
    // the response into the licenses format the UI expects
    Observable.forkJoin(detail$).subscribe((details: any[]) => {
      this.isVerifying = false;
      this.licenses = status.td_product_ids.map((s: any) => {
        const productDetail: any = details.find((d: any) => d.td_product_id === s.td_product_id);
        return {
          name: productDetail.td_product_name,
          status: s.status === 'Accepted' ? 'Verified' : s.status,
          url: productDetail.td_product_url,
          icon: productDetail.td_product_name.split(' ')[0].toLowerCase(),
        };
      });
      this.showReverify = !!this.licenses.find((lic: any) => lic.status !== 'Accepted');
    }, (err: any) => this.handleError(err, 'Error verifying licenses', () => this.verifyLicenses()));
  }

  private handleError(error: any, title: string, retryFn: Function, cancelFn?: Function): void {
    this._errorDialogService.displayError(
      this._viewContainerRef, title, error).subscribe((retry: boolean) => {
        if (retry) {
          if (retryFn) {
            retryFn();
          }
        } else {
          if (cancelFn) {
            cancelFn();
          }
        }
      });
  }

  private getStepInformation(): void {
    this.resetRequests();

    if (this.planId) {
      BuildPlan.reset();

      this.incrementRequests();

      Observable.forkJoin(
        this._buildPlanService.getBundles(),
        this._buildPlanService.getInstanceDetails(),
        this._planService.getPlan(this.planId)
      ).subscribe((result: any[]) => {
        const [ bundles, details, data ]: any = result;
        const instanceTypes: Array<InstanceType> = InstanceType.fromJSON(details.instance_types);
        const properties: any = data.original_payload.properties;
        const deployment: any = data.original_payload.deployment_bundle.shift();
        const applications: Array<any> = data.original_payload.deployment_bundle;
        const instanceTypeName: string = deployment.instances.type;
        const instance: InstanceType = instanceTypes.find((i: InstanceType) => i.type === instanceTypeName);

        let storageMediaName: string;
        let storageSize: string;
        let storageTypeName: string;

        if (deployment.instance_volumes) {
          storageTypeName = 'Network';
          storageMediaName = 'EBS_SSD';
          storageSize = deployment.instance_volumes.size_in_terabytes.toString();
        } else {
          storageTypeName = 'Local';
          storageMediaName = instance.storage.ssd ? 'SSD' : 'HDD';
        }

        const code: string = deployment.configuration.td_product_id;

        let productIds: Array<string> = Object.keys(bundles.bundle)
                                                .map((k: any) => bundles.bundle[k])
                                                .find((bundle: any) => bundle.products[0] === code)
                                                .products;

        productIds = productIds.slice(1, productIds.length);

        this.incrementRequests();

        const observables: Array<any> = productIds.map((id: string) => {
          return this._buildPlanService.getProductDetails(id);
        });

        Observable.forkJoin(observables)
                  .subscribe((data: Array<any>) => {
                    const products: Array<any> = data.map((product: any) => {
                      return { id: product.td_product_id,
                        name: product.td_product_name,
                        type: PRODUCT_TYPES[product.td_product_id] };
                    });

                    const selectedIncludedApplications: Array<any> =
                        this.getSelectedApplications(applications, products);
                    const selectedExtraApplications: Array<any> =
                        this.getSelectedApplications(applications, this.extraApplications);

                    const bundleJSON: any = {
                      code: code,
                      name: properties.tdplan_type,
                      products: products,
                    };

                    this.bundle = new Bundle(bundleJSON);
                    this.bundle.save();

                    this.planJSON = {
                      planId: properties.plan_id,
                      bundle: this.bundle.code,
                      name: properties.plan_name,
                      description: properties.plan_description,
                      instanceTypeName: instanceTypeName,
                      nodeCount: deployment.instances.count,
                      selectedIncludedApplications: selectedIncludedApplications,
                      selectedExtraApplications: selectedExtraApplications,
                      storageMediaName: storageMediaName,
                      storageSize: storageSize,
                      storageTypeName: storageTypeName,
                    };

                    this.getPlanDependencies();
                    this.decrementRequests();
                  }, (error: any) => {
                    this.decrementRequests(error);
                  });

        this.decrementRequests();
      }, (err: any) => {
        this.decrementRequests(err);
      });
    } else {
      this.getPlanDependencies();
    }
  }

  private getPlanDependencies(): void {
    this.incrementRequests();

    Observable.forkJoin(
      this._buildPlanService.getProductSizings(this.bundle.code),
      this._buildPlanService.getProductSpecifics(this.bundle.code),
      this._buildPlanService.getInstanceDetails()
    ).subscribe((result: any[]) => {
      const [ sizings, specifics, details ]: any = result;

      STORAGE_TYPES.forEach((s: any) => {
        s.loadSizings(sizings);
        s.loadInstanceDetails(details.instance_types);
      });

      this.plan.productSpecifics = specifics;

      this.decrementRequests();
    }, (err: any) => {
      this.decrementRequests(err);
    });
  }

  private getSelectedApplications(applications: Array<any>, products: Array<any>): Array<any> {
    const ids: any = applications.map((app: any) => app.configuration.td_product_id);

    return products.filter((product: any): boolean => {
                      return ids.indexOf(product.id) > -1;
                    }).map((product: any) => {
                      return {
                        id: product.id,
                        name: product.name,
                        type: product.type,
                        selected: true,
                      };
                    });
  }

  private resetRequests(): void {
    this.isLoading = true;
    this.requestsInProgress  = 0;
    this.errors = [];
  }

  private incrementRequests(): void {
    this.requestsInProgress++;
  }

  private decrementRequests(error?: any): void {
    this.requestsInProgress--;

    if (error !== undefined) {
      this.errors.push(error);
    }

    if (this.requestsInProgress <= 0) {
      this.onRequestsFinished();
    }
  }

  private onRequestsFinished(): void {
    this.isLoading = this.errors.length !== 0;

    if (this.errors.length > 0) {
      this._errorDialogService.displayError(
        this._viewContainerRef,
        'Error retrieving information',
        this.errors,
      ).subscribe((retry: boolean) => {
        if (retry) {
          this.getStepInformation();
        }
      });
    } else {
      if (this.planId) {
        this.plan.bundle = this.bundle;
        this.plan.load(this.planJSON);
        this.plan.save();

        sessionStorage.setItem('plan_id', this.planId);
      } else {
        this.plan.load();
      }

      if (this.credentialName) {
        this.verifyLicenses();
      }
    }
  }
}
