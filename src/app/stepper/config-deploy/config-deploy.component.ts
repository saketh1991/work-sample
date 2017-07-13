import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdDialog, MdDialogRef, MdSnackBarRef, MdSnackBar } from '@angular/material';
import { TdStepComponent, StepState } from '@covalent/core';
import { Observable } from 'rxjs/Observable';

import { BuildPlan, Cidr } from '../+models';
import { NewSecurityKeyDialogComponent } from '../+dialog';
import {
  BuildPlanService,
  DataService,
  CloudCredentialService,
  ErrorDialogService,
  LoaderService,
  tooltipservice,
} from '../services';
import { AccountsService } from '../../../modules/nebula-api/src/services/accounts.service';

enum AvailableCidrRange {
  ByNetmask = 0,
  ByCountOfIpAdresses = 1,
}

const NOT_FOUND: number = 404;

@Component({
  selector: 'td-config-deploy',
  templateUrl: 'config-deploy.component.html',
  styleUrls: ['/config-deploy.component.scss'],
})

export class ConfigDeployComponent implements OnInit {
  private _cidrFetchTimeout: any;
  private _region: string;
  private _vpc: string;

  plan: any = new BuildPlan().storedAttributes();

  availabilityZone: string;
  availableCidrRange: AvailableCidrRange = AvailableCidrRange.ByNetmask;
  subnetConfig: any = {
    minNetmask: 16,
    maxNetmask: 29,
    minIPAddresses: 1,
    maxIPAddresses: 65535,
    subnetNamePattern: '[a-zA-Z0-9_-]*',
    subnetNamePatternError: 'alphanumeric, _ and - are allowed',
  };
  netmask: number = this.subnetConfig.minNetmask;
  countOfIpAddresses: number = 1;
  availableCidrs: any[];
  isLoadingCidrs: boolean = false;
  reuseSubnet: boolean = true;
  subnetId: string;
  selectedSubnet: any;
  existingSubnets: any;
  subnetCidr: string;
  subnetName: string;
  subnetNameValid: boolean;
  securityKey: string;

  tooltipContent: any[];
  tooltipDisplay: any;

  regionZonesMapping: any;
  regions: any[];
  availabilityZones: any[];
  securityKeys: any[];
  vpcs: any[];

  isLoading: boolean = true;
  isEditing: boolean = false;

  saveButtonLabel: string = 'Save and Continue';
  nextPath: string = '/dashboard/appconfig';

  constructor(private _dataService: DataService,
              private _cloudCredentialService: CloudCredentialService,
              private _buildPlanService: BuildPlanService,
              private _loaderService: LoaderService,
              private _accountsService: AccountsService,
              private _errorDialogService: ErrorDialogService,
              private _dialogService: MdDialog,
              private _viewContainerRef: ViewContainerRef,
              private _router: Router,
              private _route: ActivatedRoute,
              private _tooltip: tooltipservice,
              private _snackBar: MdSnackBar) { }

  /* tslint:disable:no-string-literal */
  ngOnInit(): void {
    this._route.queryParams.subscribe((params: Params) => {
      this.isEditing = params['edit'] !== undefined;

      if (this.isEditing) {
        this.saveButtonLabel = 'Save and Update';
        this.nextPath = '/dashboard/confirm';
      }
    });

    this.loadInitialData();

    this._tooltip.query().subscribe((res: any[]): void => {
      this.tooltipContent = res;
    });

  }

  onChangeNetmask(): void {
    this.loadCidrs();
  }

  onChangeIpCount(newCount: any): void {
    clearTimeout(this._cidrFetchTimeout);
    this._cidrFetchTimeout = undefined;

    if (this.countOfIpAddresses === newCount) {
      return;
    }

    this.countOfIpAddresses = newCount;

    if (newCount < this.subnetConfig.minIPAddresses) {
      return;
    }

    if (newCount > this.subnetConfig.maxIPAddresses) {
      return;
    }

    this._cidrFetchTimeout = setTimeout(() => {
      this.loadCidrs();
    }, 1200);
  }

  onChangeCidrRange(): void {
    this.loadCidrs();
  }

  onChangeReuseOrCreateSubnet(): void {
    if (!this.isReusingSubnet()) {
      this.loadCidrs();
    }
  }

  onChangeCidr(cidr: string): void {
    if (this.availableCidrs && this.availableCidrs.length > 0) {
      this.subnetCidr = cidr;
    }
  }

  onChangeReusedSubnet(selectedSubnetId: string): void {
    this.selectedSubnet = this.existingSubnets.find((subnet: any) => subnet.subnet_id === selectedSubnetId);
  }

  onChangeSubnetName($event: any): void {
    this.subnetName = $event.value;
    this.subnetNameValid = $event.valid;
  }

  isReusingSubnet(): boolean {
    return this.reuseSubnet;
  }

  validateFields(fields: any[]): boolean {
    return fields.every((field: any) => !!field);
  }

  validateSubnet(): boolean {
   if (this.reuseSubnet) {
      return !!this.selectedSubnet;
    } else {
      const subnetPattern: any = /((\b|\.)(1|2(?!5(?=6|7|8|9)|6|7|8|9))?\d{1,2}){4}\/\d+$/;
      if (!this.subnetCidr || !this.subnetName) {
        return false;
      }

      if (!this.subnetNameValid) {
        return false;
      }

      return !!this.subnetCidr.match(subnetPattern);
    }
  }

  canSave(): boolean {
    const fields: any = [
      this.region,
      this.vpc,
      this.availabilityZone,
      this.securityKey,
    ];

    if (this.reuseSubnet) {
      fields.push(this.selectedSubnet);
    } else {
      fields.push(this.subnetCidr);
      fields.push(this.subnetName);
    }

    return this.validateFields(fields);
  }

  saveAndContinue(): void {
    this.saveSettings();
    this._router.navigate([this.nextPath]);
  }

  isStepPending(step: TdStepComponent): boolean {
    return step.state !== StepState.Complete;
  }

  continue(step: TdStepComponent, nextStep?: TdStepComponent): void {
    this.saveSettings();

    step.state = StepState.Complete;

    if (nextStep) {
      nextStep.disabled = false;
      nextStep.open();
    } else {
      step.close();
    }
  }

  addNewKey(): void {
    const viewContainerRef: ViewContainerRef = this._viewContainerRef;
    const dialogRef: MdDialogRef<NewSecurityKeyDialogComponent> =
      this._dialogService.open(NewSecurityKeyDialogComponent, { viewContainerRef });

    const errorHandler: any = (err: any) => {
      this.handleError(err, 'Error saving credential', () => this.addNewKey());
    };

    dialogRef.afterClosed().subscribe((res: any) => {
      if (!res) {
        return;
      }

      if (res.error) {
        errorHandler(res.error);
        return;
      }

      this.loadKeys();
    }, errorHandler);
  }

  stopPropagation(step: any): void {
    this.tooltipDisplay = JSON.stringify(this.tooltipContent['builplan']);
    for (const tooltip of this.tooltipContent['builplan']){
      if (tooltip['id'] === step) {
        this.tooltipDisplay = tooltip['Tooltip'];
      }
    }
  }

  getVpcLabel(vpc: any): string {
    if (!this.vpcs) {
      return undefined;
    }

    const vpcConfig: any = this.vpcs.find((config: any): boolean => {
      return config.vpc_id === vpc;
    });

    return vpcConfig ? `${vpcConfig.vpc_name} - ${vpcConfig.cidr_block}` : undefined;
  }

  set region(region: string) {
    this._region = region;
    this.availabilityZone = undefined;
    if (this.regionZonesMapping) {
      this.availabilityZones = this.regionZonesMapping[region];
    } else {
      this.availabilityZones = [];
    }
    if (!!this._region) {
      this.loadVpcs();
    }
  }

  get region(): string {
    return this._region;
  }

  set vpc(vpc: string) {
    this._vpc = vpc;
    this.loadSubnets();
  }

  get vpc(): string {
    return this._vpc;
  }

  get isAvailableCidrRangeByNetmask(): boolean {
    return this.availableCidrRange === AvailableCidrRange.ByNetmask;
  }

  get isAvailableCidrRangeByCount(): boolean {
    return this.availableCidrRange === AvailableCidrRange.ByCountOfIpAdresses;
  }

  private isIPCountWithinRange(): boolean {
    return this.countOfIpAddresses &&
      (this.countOfIpAddresses >= this.subnetConfig.minIPAddresses ||
        this.countOfIpAddresses <= this.subnetConfig.maxIPAddresses);
  }

  private loadSettings(): void {
    const settings: any = JSON.parse(sessionStorage.getItem('tddbconfig'));
    if (settings) {
      this.vpc = settings.vpc;
      this.region = settings.region;
      this.selectedSubnet = settings.reused_subnet;
      this.subnetId = this.selectedSubnet ? this.selectedSubnet.subnet_id : undefined;
      this.subnetCidr = settings.cidr;
      this.subnetName = settings.public_subnet;
      this.securityKey = settings.public_key;
      this.availabilityZone = settings.availability_zone;
    }
    this.reuseSubnet = !!this.selectedSubnet || !this.subnetCidr || !this.subnetName;
  }

  private loadInitialData(): void {
    const loadData$: Observable<any> = Observable.forkJoin(
      this._buildPlanService.getRegionAvailability(),
      this._cloudCredentialService.getKeys(),
    );

    this._loaderService.load('data.load', loadData$).subscribe((res: any[]) => {
      this.isLoading = false;
      this.regionZonesMapping = res[0].regions.reduce((hash: any, item: any) => {
        const key: string = Object.keys(item)[0];
        const regions: string[] = item[key];
        hash[key] = regions;
        return hash;
      }, {});
      this.regions = Object.keys(this.regionZonesMapping);
      this.setSecurityKeys(res[1]);

      this.loadSettings();
    }, (err: any) => this.handleError(err, 'Error loading data', () => this.loadInitialData()));
  }

  private loadVpcs(): void {
    const cloudname: string = sessionStorage.getItem('cloudname');
    if (this.validateFields([this.region, cloudname])) {
      this._accountsService.getVpcs('aws', this.region, cloudname).subscribe((response: any): void => {
        this.vpcs = response.vpcs;
        this.loadSubnets();
      }, (error: any): void => {
        this.handleError(error, `Error loading VPCs for ${cloudname} / ${this.region}`, () => this.loadVpcs());
      });
    }
  }

  private loadSubnets(): void {
    const cloudname: string = sessionStorage.getItem('cloudname');

    if (this.validateFields([this.region, cloudname, this.vpc])) {
      this._accountsService.getSubnets('aws', this.region, cloudname, this.vpc).subscribe((res: any): void => {
        this.existingSubnets = res.subnets;
      }, (err: any): void => {
        if (err.status === NOT_FOUND) {
          this.existingSubnets = [];
          return;
        }
        this.handleError(err,
          `Error loading subnets for ${cloudname} / ${this.region} / ${this.vpc}`,
          () => this.loadSubnets());
      });
    }

  }

  private loadCidrs(): void {
    const cloudname: string = sessionStorage.getItem('cloudname');
    if (this.isAvailableCidrRangeByNetmask) {
      this.loadCidrsByNetmask(cloudname);
    } else {
      this.loadCidrsByIpCount(cloudname);
    }
  }

  private loadCidrsByNetmask(cloudname: string): void {
    this.isLoadingCidrs = true;

    if (this.validateFields([this.region, cloudname, this.vpc, this.netmask])) {
      this._accountsService.getAvailableCidrsWithNetmask('aws',
                                                         this.region,
                                                         cloudname,
                                                         this.vpc,
                                                         this.netmask)
                           .subscribe((res: any): void => {
                             this.isLoadingCidrs = false;
                             this.availableCidrs = Cidr.fromJSON(res.subnets);
                             if (this.availableCidrs.length === 0) {
                               this.showMessage(`No available CIDR's for netmask ${this.netmask}.`);
                             }
                           }, (err: any): void => {
                             this.isLoadingCidrs = false;
                             this.handleError(err,
                                `Error loading CIDRs for ${cloudname} / 
                                  ${this.region} / ${this.vpc} / ${this.netmask}`,
                                () => this.loadCidrsByNetmask(cloudname));
                            });
    }
  }

  private loadCidrsByIpCount(cloudname: string): void {
    if (!this.isIPCountWithinRange()) {
      return;
    }

    this.isLoadingCidrs = true;

    if (this.validateFields([this.region, cloudname, this.vpc, this.countOfIpAddresses])) {
      this._accountsService.getAvailableCidrsWithCount('aws',
                                                       this.region,
                                                       cloudname,
                                                       this.vpc,
                                                       this.countOfIpAddresses)
                           .subscribe((res: any): void => {
                             this.isLoadingCidrs = false;
                             this.availableCidrs = Cidr.fromJSON(res.subnets);
                             if (this.availableCidrs.length === 0) {
                               this.showMessage(`No available CIDR's.`);
                             }
                           }, (err: any): void => {
                             this.isLoadingCidrs = false;
                             this.handleError(err,
                                `Error loading subnets for ${cloudname} / 
                                ${this.region} / ${this.vpc} / ${this.countOfIpAddresses}`,
                                () => this.loadCidrsByIpCount(cloudname));
                            });
    }
  }

  private saveSettings(): void {
    const settings: any = {
      plan_id: sessionStorage.getItem('plan_id'),
      vpc: this.vpc,
      region: this.region,
      reused_subnet: undefined,
      cidr: undefined,
      public_subnet: undefined,
      public_key: this.securityKey,
      availability_zone: this.availabilityZone,
    };

    if (this.reuseSubnet) {
      settings.reused_subnet = this.selectedSubnet;
    } else {
      settings.cidr = this.subnetCidr;
      settings.public_subnet = this.subnetName;
    }

    sessionStorage.setItem('tddbconfig', JSON.stringify(settings));
  }

  private setSecurityKeys(res: any): void {
    this.securityKeys = res.keys.map((key: any) => key.keyname);
  }

  private loadKeys(): void {
    this.isLoading = true;
    this._cloudCredentialService.getKeys().subscribe((res: any) => {
      this.isLoading = false;
      this.setSecurityKeys(res);
    }, (err: any) => this.handleError(err, 'Error loading security keys', () => this.loadInitialData()));
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

  private showMessage(message: string): void {
    const snackBarRef: MdSnackBarRef<any> = this._snackBar.open(message, 'Dismiss');
    setTimeout(() => {
      snackBarRef.dismiss();
    }, 5000);
  }
}
