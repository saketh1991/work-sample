/* tslint:disable:no-string-literal */
/* tslint:disable:no-unused-variable */
/* tslint:disable:variable-name */

import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { TdStepComponent, StepState, TdMediaService } from '@covalent/core';
import { Observable, Subject } from 'rxjs';

import { BuildPlanService, ErrorDialogService, LoaderService, tooltipservice } from '../services';
import { BuildPlan, Sizing, StorageType, STORAGE_TYPES } from '../+models';
import any = jasmine.any;

@Component({
  selector: 'td-build-plan',
  templateUrl: 'build-plan.component.html',
  styleUrls: ['build-plan.component.scss'],
  viewProviders: [ BuildPlanService ],
})
export class BuildPlanComponent implements OnInit {

  /** Build plan */
  plan: BuildPlan = new BuildPlan();

  /** Plan Name */
  planName: string;
  planDescription: string;

  /** Storage and Compute */
  storageTypes: any[] = STORAGE_TYPES;
  _availableSizings: Sizing[] = [];

  dataStream: any;
  dataMover: any;

  tooltip_content: any[];
  tooltip_display: any;

  /** Steps */
  @ViewChild('step1') step1: TdStepComponent;
  @ViewChild('step2') step2: TdStepComponent;
  @ViewChild('step3') step3: TdStepComponent;
  @ViewChild('step4') step4: TdStepComponent;

  constructor(private _buildPlanService: BuildPlanService,
              private _errorService: ErrorDialogService,
              private _loaderService: LoaderService,
              private _router: Router,
              private _viewContainerRef: ViewContainerRef,
              private _tooltip: tooltipservice,
              private _mediaService: TdMediaService) {}

  ngOnInit(): void {
    if (!this.plan.productId) {
      // no bundle selected
      this._router.navigate(['/dashboard/tdplans']);
      return;
    }

    const json: any = JSON.parse(sessionStorage.getItem('nebulaBuildPlan'));
    
    if (json && json.planId) {
      // previous plan selected
      this._router.navigate(['/dashboard/appverify'], { queryParams: { planId: this.plan.planId } });
      return;
    }

    this.loadPlan();
    this.loadDataMover();
    this.loadDataStream();

    this._tooltip.query().subscribe((res: any[]): void => {
      this.tooltip_content = res;
    });
  }

  loadPlan(): Observable<any> {
    const subject: Subject<any> = new Subject<any>();

    const { productId }: any = this.plan;

    const loading$: any = Observable.forkJoin(
      this._buildPlanService.getProductSizings(productId),
      this._buildPlanService.getProductSpecifics(productId),
      this._buildPlanService.getInstanceDetails()
    );
    this._loaderService.load('plan.load', loading$).subscribe((res: any[]) => {
      const [ sizings, specifics, instances]: any = res;

      this.storageTypes.forEach((s: any) => {
        s.loadSizings(sizings);
        s.loadInstanceDetails(instances.instance_types);
      });

      this.plan.productSpecifics = specifics;
      this.plan.load();

      subject.next();
    }, (err: any) => {
      this._errorService.displayError(
        this._viewContainerRef,
        'Error loading plan information',
        err,
      ).subscribe((retry: boolean) => {
        if (retry) {
          this.loadPlan();
        } else {
          subject.error(err);
        }
      });
    });
    return subject.asObservable();
  }

  loadDataStream(): Observable<any> {
    const subject: Subject<any> = new Subject<any>();
    const loading$: any = Observable.forkJoin(
      this._buildPlanService.getProductSizings('td_dsc_1st_edition'),
      this._buildPlanService.getInstanceDetails()
    );

    this._loaderService.load('data_stream.load', loading$).subscribe((res: any[]) => {
      const [ sizings, details]: any = res;

      let instances: Array<string> = [];
      sizings[0].instances.forEach((instance: any): void => {
        instances.push(instance.type);
      });

      this.dataStream = details.instance_types.filter((i: any): boolean => {
        return instances.indexOf(i.instance_type) !== -1;
      });

      subject.next();
    }, (err: any) => {
      this._errorService.displayError(
        this._viewContainerRef,
        'Error loading plan information',
        err,
      ).subscribe((retry: boolean) => {
        if (retry) {
          this.loadPlan();
        } else {
          subject.error(err);
        }
      });
    });

    return subject.asObservable();
  }

  loadDataMover(): void {
    const subject: Subject<any> = new Subject<any>();

    const loading$: any = Observable.forkJoin(
      this._buildPlanService.getProductSizings('td_dm_1st_edition'),
      this._buildPlanService.getInstanceDetails()
    );

    this._loaderService.load('data_mover.load', loading$).subscribe((res: any[]) => {
      const [ sizings, details]: any = res;

      let instances: Array<string> = [];

      sizings[0].instances.forEach((instance: any): void => {
        instances.push(instance.type);
      });

      this.dataMover = details.instance_types.filter((i: any): boolean => {
        return instances.indexOf(i.instance_type) !== -1;
      });

      subject.next();
    }, (err: any) => {
      this._errorService.displayError(
        this._viewContainerRef,
        'Error loading plan information',
        err,
      ).subscribe((retry: boolean) => {
        if (retry) {
          this.loadPlan();
        } else {
          subject.error(err);
        }
      });
    });
  }

  isLoading(): boolean {
    return this._loaderService.isLoading('plan.load');
  }

  /**
   * Determines if an app is selected
   *
   * @param app
   */
  appSelected(key: any): boolean {
    // try to find the app in the included applications
    let app: any = this.plan.includedApplications.find((application: any): any => {
      return application.type === key;
    });

    // if you dont then try to find it in extra apps
    if (!app) {
      app = this.plan.extraApplications.find((application: any): any => {
        return application.type === key;
      });
    }

    return app ? app.selected : false;
  }

  isStepPending(step: TdStepComponent): boolean {
    return step.state !== StepState.Complete;
  }

  validatePlanName(): void {
    this.plan.save();
    this.step1.state = StepState.Complete;
    this.step2.disabled = false;
    this.step2.open();
  }

  validateStorageAndCompute(): void {
    this.plan.save();
    this.step2.state = StepState.Complete;
    this.step3.disabled = false;
    this.step3.open();
  }

  validateIncludedApplications(): void {
    this.plan.save();
    this.step3.state = StepState.Complete;
    this.step4.disabled = false;
    this.step4.open();
  }

  validateExtraApplications(): void {
    this.plan.save();
    this.step4.state = StepState.Complete;
    this.step4.close();
  }

  saveAndContinue(): void {
    const createBuildPlan$: Observable<any> = this._buildPlanService.createPlan(this.plan);
    this.plan.save();
    this._loaderService.load('plan.load', createBuildPlan$).subscribe((res: any) => {
      sessionStorage.setItem('plan_id', res.environments_post_payload.plan_id);
      this._router.navigate(['/dashboard/appverify']);
    }, (err: any) => {
      this._errorService.displayError(
        this._viewContainerRef,
        'Error saving plan',
        err,
      ).subscribe((retry: boolean) => {
        if (retry) {
          this.saveAndContinue();
        }
      });
    });
  }

  stopPropagation(step: any): void {
    this.tooltip_display = JSON.stringify(this.tooltip_content['builplan']);

    for (let tooltip of this.tooltip_content['builplan']) {
      if (tooltip['id'] === step) {
        this.tooltip_display = tooltip['Tooltip'];
      }
    }
  }

  onStorageTypeChange(storageType: StorageType): void {
    this.plan.storageEncryption = 'False';
  }

  get availableStorageTypes(): StorageType[] {
    return this.storageTypes.filter((t: StorageType) => {
      return t.sizings && t.sizings.length;
    });
  }

  get storageTypeDescription(): string {
    return `${this.plan.storageTypeName} ${this.plan.storageMediaName}`;
  }

  get instanceTypeVCPUDescription(): string {
    if (!this.isPlanValid()) {
      return '';
    }

    return `${this.plan.instanceType.vCPU}`;
  }

  get instanceMemoryDescription(): string {
    if (!this.isPlanValid()) {
      return '';
    }

    return `${this.plan.instanceType.memory} GiB`;
  }

  get instanceNetworkPerformanceDescription(): string {
    if (!this.isPlanValid()) {
      return '';
    }

    return `${this.plan.instanceType.ebsMaxBandwidth} Mbps`;
  }

  get instanceStorageDescription(): string {
    if (!this.isPlanValid()) {
      return '';
    }

    if (this.plan.storageSize !== undefined) {
      return `${this.plan.storageSize} TB per node`;
    }

    return `${this.plan.instanceType.totalDevicesSize / 1000} TB`;
  }

  get encryptionDescription(): string {
    if (!this.isPlanValid()) {
      return '';
    }

    return this.plan.storageEncryption === 'False' ? 'No' : 'Yes';
  }

  private isPlanValid(): boolean {
    return this.plan && this.plan.isValid();
  }
}
