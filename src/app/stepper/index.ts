import { Component } from '@angular/core';

import { BuildPlanComponent } from './build-plan';
import { VerifyAppsComponent } from './verify-apps';
import { ConfigDeployComponent } from './config-deploy';
import { ConfigAppsComponent } from './config-apps';
import { ReviewComponent } from './review';

import { NewCredentialDialogComponent, NewSecurityKeyDialogComponent } from './+dialog';

import {
  InputFieldComponent,
  PlanSummaryComponent,
  StepsLayoutComponent,
  StepperSummaryComponent,

  StepTrackerDirective,
} from './+component';

import {
  BuildPlanService,
  CloudCredentialService,
  DataService,
  ErrorDialogService,
  EulaService,
  HttpService,
  LoaderService,
  MessagingService,
} from './services';

const STEPPER_COMPONENTS: Component[] = [
  /** stepper components */
  BuildPlanComponent,
  VerifyAppsComponent,
  ConfigDeployComponent,
  ConfigAppsComponent,
  ReviewComponent,

  /** reusable components */
  PlanSummaryComponent,
  StepsLayoutComponent,
  StepperSummaryComponent,
  InputFieldComponent,

  /** directives */
  StepTrackerDirective,

  /** dialogs */
  NewCredentialDialogComponent,
  NewSecurityKeyDialogComponent,
];

const STEPPER_ENTRY_COMPONENTS: Component[] = [
  NewCredentialDialogComponent,
  NewSecurityKeyDialogComponent,
];

const STEPPER_SERVICES: any[] = [
  BuildPlanService,
  CloudCredentialService,
  DataService,
  ErrorDialogService,
  EulaService,
  HttpService,
  LoaderService,
  MessagingService,
];

export {
  /** ngModule dependencies */
  STEPPER_COMPONENTS,
  STEPPER_ENTRY_COMPONENTS,
  STEPPER_SERVICES,

  /** route dependencies */
  BuildPlanComponent,
  VerifyAppsComponent,
  ConfigDeployComponent,
  ConfigAppsComponent,
  ReviewComponent,
};
