/* tslint:disable:no-require-imports */
import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MdSnackBar, MdSnackBarRef } from '@angular/material';

import { BuildPlan } from '../+models';
import { BuildPlanService, ErrorDialogService, LoaderService, MessagingService } from '../services';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  /** Build plan */
  plan: BuildPlan = new BuildPlan().storedAttributes();

  deployConfig: any;
  _reuseSubnet: boolean;
  appsConfig: any = {};

  constructor(private _buildPlanService: BuildPlanService,
              private _loaderService: LoaderService,
              private _errorService: ErrorDialogService,
              private _snackBarService: MdSnackBar,
              private _viewContainerRef: ViewContainerRef,
              private _router: Router,
              private _messagingService: MessagingService) {
    this.deployConfig = JSON.parse(sessionStorage.getItem('tddbconfig'));
    this._reuseSubnet = !!this.deployConfig.reused_subnet ||
                        !this.deployConfig.cidr ||
                        !this.deployConfig.public_subnet;

    ['db', 'serverManagement', 'dsc', 'dataMover'].forEach((setting: string) => {
      const key: string = `${setting}Config`;
      const settings: any = JSON.parse(sessionStorage.getItem(`config-apps-${key}`));

      if (settings) {
        this.appsConfig[key] = settings;
      }
    });
  }

  ngOnInit(): void {
    if (!this.plan) {
      this._router.navigate(['/dashboard/stepper']);
      return;
    }
  }

  deploy(): void {
    /* tslint:disable:no-console */
    const localPlan: BuildPlan = new BuildPlan();
    console.log('execution request payload', localPlan.toExecutionPayload());
    const execute$: Observable<any> = this._buildPlanService.executePlan(localPlan);
    this._loaderService.load('plan.execute', execute$).subscribe((res: any[]) => {
      console.log('execution response payload', res);

      this._messagingService.showMessage('Deploy started successfully.');
      this._router.navigate(['/dashboard']);
    }, (err: any) => {
      this._errorService.displayError(
        this._viewContainerRef,
        'Error deploying plan',
        err,
      ).subscribe((retry: boolean) => {
        if (retry) {
          this.deploy();
        }
      });
    });
    /* tslint:enable:no-console */
  }

  isLoading(): boolean {
    return this._loaderService.isLoading('plan.execute');
  }

  isReusingSubnet(): boolean {
    return this._reuseSubnet;
  }

  export(): void {
    const fileSaver: any = require('file-saver');
    const localPlan: BuildPlan = new BuildPlan();
    const payload: any = localPlan.toExecutionPayload();
    const blob: Blob = new Blob([JSON.stringify(payload, undefined, 4)], { type: 'text/plain;charset=utf-8' });
    const date: string = new Date().toISOString().substr(0, 10);
    const escapedPlanName: string = this.plan.name.replace(/[^A-Z0-9]+/ig, '_');

    fileSaver.saveAs(blob, `${escapedPlanName}_${date}.json`);
    this.showMessage('Plan details exported successfully.');
  }

  private showMessage(message: string): void {
    let snackBarRef: MdSnackBarRef<any> = this._snackBarService.open(message, 'Dismiss');

    setTimeout(() => {
      snackBarRef.dismiss();
    }, 10000);
  }

}
