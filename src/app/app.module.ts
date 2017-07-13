import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CovalentHighlightModule } from '@covalent/highlight';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { CovalentCoreModule } from '@covalent/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TdPlansComponent } from './td-plans/td-plans.component';
import { forgetPasswordComponent } from './password-reset/password-reset.component';
import { firstUserComponent } from './firstuser/firstuser.component';
import { JWTDataService } from '../services/';
import { loginService, predefinedService, securitykeyService, eulaService } from '../services/';
import { NebulaPromopageComponent } from './nebula-promopage/nebula-promopage.component';
import { stepperComponent } from './stepper/old/stepper.component';
import { CopyrightComponent } from './about/copyright/copyright.component';
import { HttpModule } from '@angular/http';
import { NebulaApiModule } from '../modules/nebula-api/nebula-api.module';
import { ClipboardModule } from 'ngx-clipboard';

import { SecuritykeyComponent } from './securitykey/securitykey.component';
import { DialogComponent } from './dialog.component';
import { CloudkeyComponent } from './cloudkey/cloudkey.component';
import { LoginComponent } from './login/login.component';
import { Apiurl } from './api-url';
import { appRoutes, appRoutingProviders} from './app.routes';

import { DatamoverComponent } from './datamover/datamover.component';
import { InstanceCalculatorComponent } from './instance-calculator/instance-calculator.component';

import { AccountsService, TokenService } from '../modules/nebula-api';
import { VersionService } from './about/version/version.service';

import { DASHBOARD_COMPONENTS, DASHBOARD_SERVICES, DASHBOARD_PIPES, DASHBOARD_MODULES } from './dashboard';
import { STEPPER_COMPONENTS, STEPPER_ENTRY_COMPONENTS, STEPPER_SERVICES } from './stepper';
import { FORM_COMPONENTS } from './forms';
import { PLANS_COMPONENTS, PLANS_SERVICES, PLANS_MODULES } from './plans';
import { AboutComponent } from './about/about.component';
import { VersionComponent } from './about/version/version.component';
import { AdminuserdetailsComponent } from './adminuserdetails/adminuserdetails.component';
import { UsersComponent } from './users/users.component';
import { SessionWatcherService } from './users';

import { tooltipservice } from '../services/tooltip.service';

import { ToolbarComponent } from './main/toolbar/toolbar.component';
import { NavComponent } from './main/nav/nav.component';
import { AnalyticsService } from './analytics/analytics.service';
import { ENVIRONMENT_KEY_COMPONENTS, ENVIRONMENT_KEY_ENTRY_COMPONENTS } from './dashboard/environment-details';
import { InstanceSelectorComponent } from './stepper/+component/instance-selector/instance-selector.component';
import { EulaComponent } from './eula/eula.component';
import { GaService } from './analytics/adapter/ga.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavComponent,
    DashboardComponent,
    LoginComponent,
    TdPlansComponent,
    DatamoverComponent,
    CopyrightComponent,
    InstanceCalculatorComponent,
    forgetPasswordComponent,
    firstUserComponent,
    SecuritykeyComponent,
    DialogComponent,
    CloudkeyComponent,
    NebulaPromopageComponent,
    DatamoverComponent,
    InstanceCalculatorComponent,
    stepperComponent,

    DASHBOARD_PIPES,
    DASHBOARD_COMPONENTS,
    STEPPER_COMPONENTS,
    FORM_COMPONENTS,
    PLANS_COMPONENTS,

    AboutComponent,

    VersionComponent,

    AdminuserdetailsComponent,

    UsersComponent,

    ToolbarComponent,
    NavComponent,
    ENVIRONMENT_KEY_COMPONENTS,
    InstanceSelectorComponent,
    EulaComponent,
  ], // directives, components, and pipes owned by this NgModule
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    MaterialModule.forRoot(),
    BrowserAnimationsModule,
    CovalentCoreModule.forRoot(),
    CovalentHighlightModule.forRoot(),
    appRoutes, HttpModule,
    NebulaApiModule,
    ClipboardModule,
    DASHBOARD_MODULES,
    PLANS_MODULES,
  ], // modules needed to run this module
  providers: [
    appRoutingProviders,
    AccountsService,
    TokenService,
    JWTDataService,
    loginService,
    predefinedService,
    securitykeyService,
    DialogComponent,
    Apiurl,
    eulaService,
    VersionService,
    SessionWatcherService,

    DASHBOARD_SERVICES,
    STEPPER_SERVICES,
    PLANS_SERVICES,
    tooltipservice,
    AnalyticsService,
    GaService,
  ], // additional providers needed for this module
  entryComponents: [
    STEPPER_ENTRY_COMPONENTS,
    DialogComponent,
    ENVIRONMENT_KEY_ENTRY_COMPONENTS,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
