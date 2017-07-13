import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { TdPlansComponent } from './td-plans/td-plans.component';
import { SecuritykeyComponent } from './securitykey/securitykey.component';
import { LoginComponent } from './login/login.component';
import { forgetPasswordComponent } from './password-reset/password-reset.component';
import { firstUserComponent } from './firstuser/firstuser.component';
import { DatamoverComponent } from './datamover/datamover.component';

import { NebulaPromopageComponent } from './nebula-promopage/nebula-promopage.component';
import { CloudkeyComponent } from './cloudkey/cloudkey.component';
import { AdminuserdetailsComponent } from './adminuserdetails/adminuserdetails.component';
import { UsersComponent } from './users/users.component';

import { BuildPlanComponent } from './stepper';
import { VerifyAppsComponent } from './stepper';
import { ConfigDeployComponent } from './stepper';
import { ConfigAppsComponent } from './stepper';
import { ReviewComponent } from './stepper';

import { DashboardComponent } from './dashboard';
import { EnvironmentDetailsComponent } from './dashboard';
import { EnvironmentLogsComponent } from './dashboard';

import { PlansComponent } from './plans';

const routes: Routes = [
  { path: 'recover', component: forgetPasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: NebulaPromopageComponent },
  { path: 'dashboard', component: MainComponent, children: [
      { path: 'users', component: UsersComponent },
      { path: 'users/:role', component: UsersComponent },
      { path: 'userdetails', component: AdminuserdetailsComponent },

      { path: 'stepper', component: BuildPlanComponent },
      { path: 'appverify', component: VerifyAppsComponent },
      { path: 'tddbconfig', component: ConfigDeployComponent },
      { path: 'appconfig', component: ConfigAppsComponent },
      { path: 'confirm', component: ReviewComponent },
      { path: ':id/logs', component: EnvironmentLogsComponent },
      { path: ':id/details', component: EnvironmentDetailsComponent },
      { path: '', component: DashboardComponent },
      { path: 'plans', component: PlansComponent },

      { path: 'datamover', component: DatamoverComponent },
      { path: 'register', component: firstUserComponent },
      { path: 'tdplans', component: TdPlansComponent },
      { path: 'securitykey', component: SecuritykeyComponent },
      { path: 'cloudkey', component: CloudkeyComponent },
    ],
  },
];

export const appRoutingProviders: any[] = [];

export const appRoutes: any = RouterModule.forRoot(routes);
