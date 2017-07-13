/* tslint:disable:no-string-literal */

import { Component, AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TdStepComponent, StepState } from '@covalent/core';

import { BuildPlan } from '../+models';
import { DataService, ErrorDialogService, LoaderService, tooltipservice } from '../services';
import { AccountsService } from '../../../modules/nebula-api/src/services/accounts.service';

@Component({
  selector: 'td-config-apps',
  templateUrl: 'config-apps.component.html',
  styleUrls: ['config-apps.component.scss'],
})
export class ConfigAppsComponent implements AfterViewInit {
  /** current in-session plan attributes for the plan summary */
  plan: any = new BuildPlan().storedAttributes();

  /** config settings */
  dbConfig: any = {
    nickname: undefined,
    nicknameMinLength: 1,
    nicknameMaxLength: 8,
    nicknamePattern: '^[A-Za-z0-9]*$',
    systemName: undefined,
    systemNameMinLength: 1,
    systemNameMaxLength: 15,
    systemNamePattern: '^[A-Za-z0-9]*$',
    password: undefined,
    passwordVerification: '',
    passwordMinLength: 4,
    kanjiSupport: 'no',
    timezone: undefined,
    encryption: 'False',
    valid: false,
  };

  serverManagementConfig: any = {
    siteId: undefined,
    siteIdMinLength: 1,
    siteIdMaxLength: 15,
    siteIdPattern: '[A-Z0-9]*',
    siteIdValid: false,
    restPassword: undefined,
    restPasswordVerification: '',
    restPasswordMinLength: 6,
    restPasswordMaxLength: 32,
    restPasswordPattern: '^[A-Za-z0-9]*$',
    restPasswordValid: false,
    password: undefined,
    passwordVerification: '',
    passwordMinLength: 8,
    passwordMaxLength: 32,
    passwordPattern: '^[A-Za-z0-9]*$',
    passwordValid: false,
  };

  dscConfig: any = {
    password: undefined,
    passwordVerification: '',
    passwordMinLength: 8,
    passwordMaxLength: 15,
    valid: false,
  };

  dataMoverConfig: any = {
    password: undefined,
    passwordVerification: '',
    passwordMinLength: 8,
    passwordMaxLength: 15,
    passwordPattern: '^[A-Za-z][A-Za-z0-9]*$',
    passwordValid: false,
    repositoryPassword: undefined,
    repositoryPasswordVerification: '',
    repositoryPasswordMinLength: 8,
    repositoryPasswordMaxLength: 15,
    repositoryPasswordPattern: '^[A-Za-z][A-Za-z0-9]*$',
    repositoryPasswordValid: false,
  };

  timezones: any[];
  steps: TdStepComponent[];

  /** tooltip */
  tooltip_content : any[];
  tooltip_display: any;

  isEditing: boolean = false;
  saveButtonLabel: string = 'Save and Continue';

  /* tslint:disable:typedef-whitespace */
  @ViewChild('step1')     initialStep   : TdStepComponent;
  @ViewChild('vp')        vpStep        : TdStepComponent;
  @ViewChild('cmic')      cmicStep      : TdStepComponent;
  @ViewChild('rest')      restStep      : TdStepComponent;
  @ViewChild('dsu')       dsuStep       : TdStepComponent;
  @ViewChild('em')        emStep        : TdStepComponent;
  @ViewChild('datamover') datamoverStep : TdStepComponent;
  /* tslint:enable:typedef-whitespace */

  constructor(private _dataService: DataService,
              private _accountService: AccountsService,
              private _loaderService: LoaderService,
              private _errorDialogService: ErrorDialogService,
              private _viewContainerRef: ViewContainerRef,
              private _router: Router,
              private _route: ActivatedRoute,
              private _tooltip: tooltipservice) { }

  ngAfterViewInit(): void {
    this._route.queryParams.subscribe((params: Params) => {
      this.isEditing = params['edit'] !== undefined;

      if (this.isEditing) {
        this.saveButtonLabel = 'Save and Update';
      }
    });

    this.loadSettings();
    this.enableAppSteps();

    const loadTimeZones$: any = this._accountService.getTimezones();

    this._loaderService.load('data.load', loadTimeZones$).subscribe((res: any) => {
      this.timezones = res.timezone.all_timezones;
      this.dbConfig.timezone = res.timezone.default_timezone;
    });

    this._tooltip.query().subscribe((res: any[]): void => {
      this.tooltip_content = res;
    });
  }

  dbPasswordChanged($event: any): void {
    this.dbConfig.password = $event.value;
    this.dbConfig.passwordVerification = $event.verification;
    this.dbConfig.valid = $event.valid;
  }

  isDbConfigValid(): boolean {
    return this.dbConfig.valid && !this.containsEmptySetting(this.dbConfig);
  }

  saveAndContinue(): void {
    this.saveSettings();
    this._router.navigate(['/dashboard/confirm']);
  }

  loadSettings(): void {
    ['db', 'serverManagement', 'dsc', 'dataMover'].forEach((setting: string) => {
      const key: string = `${setting}Config`;
      const settings: any = JSON.parse(sessionStorage.getItem(`config-apps-${key}`));

      if (settings) {
        this[key] = settings;
      }
    });
  }

  saveSettings(): void {
    sessionStorage.setItem('config-apps-dbConfig', JSON.stringify(this.dbConfig));
    sessionStorage.setItem('config-apps-serverManagementConfig', JSON.stringify(this.serverManagementConfig));
    sessionStorage.setItem('config-apps-dscConfig', JSON.stringify(this.dscConfig));
    sessionStorage.setItem('config-apps-dataMoverConfig', JSON.stringify(this.dataMoverConfig));

    const appConfig: any = {
      timezone: this.dbConfig.timezone,
      kanji_support: this.dbConfig,
      dm: this.hasApp('datamover'),
      dm_pass: this.dataMoverConfig.password,
      dm_id: this.dataMoverConfig.repositoryPassword,
      db_nickname: this.dbConfig.nickname,
      db_systemname: this.dbConfig.systemName,
      db_password: this.dbConfig.password,
      sm_site_id: this.serverManagementConfig.siteId,
      sm_pass: this.serverManagementConfig.password,
      sm_rest_pass: this.serverManagementConfig.restPassword,
    };

    sessionStorage.setItem('appconfig', JSON.stringify(appConfig));

    const deploySettings: any = sessionStorage.getItem('tddbconfig');

    const settings: any = {
      plan_id: sessionStorage.getItem('plan_id'),

      cidr: deploySettings.cidr,
      public_subnet: deploySettings.public_subnet,
      region: deploySettings.region,
      vpc_id: deploySettings.vpc,
      public_key: deploySettings.publickey,
      availability_zone: deploySettings.availability_zone,

      timezone: this.dbConfig.timezone,
      kanji_support: this.dbConfig.appkanji,

      dm: this.hasApp('datamover'),
      dm_pass: this.dataMoverConfig.password,
      dm_id: this.dataMoverConfig.repositoryPassword,
      db_nickname: this.dbConfig.nickname,
      db_systemname: this.dbConfig.systemName,
      db_password: this.dbConfig.password,
      sm_site_id: this.serverManagementConfig.siteId,
      sm_pass: this.serverManagementConfig.password,
      sm_rest_pass: this.serverManagementConfig.restPassword,
    };
    sessionStorage.setItem('deployconfig', JSON.stringify(settings));
  }

  hasApp(type: string): boolean {
    if (!this.plan) {
      return false;
    }

    const includedApps: any[] = this.plan.selectedIncludedApplications;
    const extraApps: any[] = this.plan.selectedExtraApplications;
    const apps: any[] = includedApps.concat(extraApps);

    return !!apps.find((app: any) => app.type === type);
  }

  fieldChanged($event: any, model: any, attr: string): void {
    model[attr] = $event.value;
  }

  smSiteIdChanged($event: any): void {
    this.serverManagementConfig.siteId = $event.value;
    this.serverManagementConfig.siteIdValid = $event.valid;
  }

  smRestPasswordChanged($event: any): void {
    this.serverManagementConfig.restPassword = $event.value;
    this.serverManagementConfig.restPasswordVerification = $event.verification;
    this.serverManagementConfig.restPasswordValid = $event.valid;
  }

  smPasswordChanged($event: any): void {
    this.serverManagementConfig.password = $event.value;
    this.serverManagementConfig.passwordVerification = $event.verification;
    this.serverManagementConfig.passwordValid = $event.valid;
  }

  isServerManagementValid(): boolean {
    if (!this.hasApp('cmic')) {
      return true;
    }

    return this.serverManagementConfig.siteIdValid &&
           this.serverManagementConfig.restPasswordValid &&
           this.serverManagementConfig.passwordValid &&
           !this.containsEmptySetting(this.serverManagementConfig);
  }

  dscPasswordChanged($event: any): void {
    this.dscConfig.password = $event.value;
    this.dscConfig.passwordVerification = $event.verification;
    this.dscConfig.valid = $event.valid;
  }

  isDSCValid(): boolean {
    if (!this.hasApp('dsu')) {
      return true;
    }

    return this.dscConfig.valid && !this.containsEmptySetting(this.dscConfig);
  }

  dmPasswordChanged($event: any): void {
    this.dataMoverConfig.password = $event.value;
    this.dataMoverConfig.passwordVerification = $event.verification;
    this.dataMoverConfig.passwordValid = $event.valid;
  }

  dmRepositoryPasswordChanged($event: any): void {
    this.dataMoverConfig.repositoryPassword = $event.value;
    this.dataMoverConfig.repositoryPasswordVerification = $event.verification;
    this.dataMoverConfig.repositoryPasswordValid = $event.valid;
  }

  isDataMoverValid(): boolean {
    if (!this.hasApp('datamover')) {
      return true;
    }

    return this.dataMoverConfig.passwordValid &&
           this.dataMoverConfig.repositoryPasswordValid &&
          !this.containsEmptySetting(this.dataMoverConfig);
  }

  isValid(): boolean {
    return this.isDbConfigValid && this.isServerManagementValid() &&
           this.isDSCValid() && this.isDataMoverValid();
  }

  previousStepPending(step: TdStepComponent): boolean {
    if (step === this.initialStep) {
      return false;
    }

    const pos: number = this.steps.indexOf(step);
    const previousStep: TdStepComponent = this.steps[pos - 1];

    if (previousStep) {
      return previousStep.state !== StepState.Complete;
    }

    return true;
  }

  continue(step: TdStepComponent): void {
    this.saveSettings();

    const pos: number = this.steps.indexOf(step);
    let nextStep: TdStepComponent;

    if (step === this.initialStep) {
      nextStep = this.steps[0];
    } else if (this.steps.length > pos) {
      nextStep = this.steps[pos + 1];
    }

    step.state = StepState.Complete;

    if (nextStep) {
      nextStep.disabled = false;
      nextStep.open();
    } else {
      step.close();
    }
  }

  isLoading(): boolean {
    if (!this._loaderService.isLoading('data.load')) {
      this.enableAppSteps();
    }
    return this._loaderService.isLoading('data.load');
  }

  isStepEnabled(step: TdStepComponent): boolean {
    return this.steps.indexOf(step) > -1;
  }

  stopPropagation(step: any): void {
    this.tooltip_display = JSON.stringify(this.tooltip_content['builplan']);

    for (let tooltip of this.tooltip_content['builplan']) {
      if (tooltip['id'] === step) {
        this.tooltip_display = tooltip['Tooltip'];
      }
    }
  }

  private enableAppSteps(): void {
    if (!this.plan) {
      return;
    }

    const apps: string[] = [
      'vp',
      'cmic',
      'rest',
      'dsu',
      'em',
      'datamover',
    ];

    this.steps = apps.filter((type: string) => {
      const included: boolean = !!this.plan.selectedIncludedApplications.find((info: any) => info.type === type);
      const extra: boolean = !!this.plan.selectedExtraApplications.find((info: any) => info.type === type);

      return included || extra;
    })
    .map((app: string) => {
      return this[`${app}Step`];
    });
  }

  private containsEmptySetting(obj: any): boolean {
    return !!Object.keys(obj).find((k: string) => !obj[k] && obj[k] !== 0);
  }
}
