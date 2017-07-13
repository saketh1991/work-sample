// angular
import { TestBed, async, ComponentFixture} from '@angular/core/testing';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MockBackend } from "@angular/http/testing";
import { BaseRequestOptions } from '@angular/http';
import {By} from "@angular/platform-browser";
// vendors
import { Observable } from 'rxjs';
// Covalent
import { CovalentCoreModule, TdStepComponent, StepState } from '@covalent/core';
// Nebula App
import { ConfigAppsComponent } from './config-apps.component';
import { BuildPlan } from '../+models';
import { DataService, ErrorDialogService, HttpService, LoaderService } from '../services';
import { VersionService } from '../../about/version/version.service';
import { tooltipservice } from '../../../services/tooltip.service';
// Nebula Api
import { AccountsService } from '../../../modules/nebula-api/src/services/accounts.service';
import { NebulaService } from '../../../modules/nebula-api/src/services/nebula.service';
import { TokenService } from '../../../modules/nebula-api/src/services/token.service';
// mock services
import { fakeBackendProvider } from '../../../../mock-api/mock-backend';
import { MockHttpService } from '../../../../mock-api/mock-http.service';
import { Apiurl } from '../../../../mock-api/mock-api-url';
class MockRouter {
  navigate() {
    jasmine.createSpy('navigate');
  }
}
describe('Component: Stepper > ConfigAppsComponent', () => {
  let component;
  let fixture: ComponentFixture<any>;
  let de: DebugElement;
  let element: HTMLElement;
  beforeEach(async(()=> {
    TestBed.configureTestingModule({
      declarations: [
        ConfigAppsComponent
      ],
      imports: [
        CovalentCoreModule,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        {provide: ActivatedRoute, useValue:
        { 'queryParams': Observable.from([{ 'edit': true }]) }
        },
        Apiurl,
        MockBackend,
        VersionService,
        BaseRequestOptions,
        ErrorDialogService,
        {provide: Router, useClass: MockRouter},
        {provide: HttpService, useClass: MockHttpService},
        DataService,
        LoaderService,
        fakeBackendProvider,
        BuildPlan,
        AccountsService,
        TokenService,
        NebulaService,
        tooltipservice
      ]
    });
  }));
  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConfigAppsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    element = fixture.nativeElement;
    let tddb = {
      cidr: 'test',
      public_subnet: 'test',
      region: 'us-west',
      vpc: 'vpc-100001',
      public_key: 'asdfasdfasdfasdfasdf',
      availability_zone: 'us-west-1a'
    };
    sessionStorage.setItem('tddbconfig', JSON.stringify(tddb));
    component.ngAfterViewInit();
    component.enableAppSteps();
  }));
  xit('should compile the component', async(() => {
    expect(component).toBeDefined();
  }));
  xit('should test the stepper', ()=> {
    function finish () {
      component.isValid();
      component.saveSettings();
      component.saveAndContinue()
    }
    function dataMover() {
      component.hasApp('datamover');
      fixture.detectChanges();
      component.dataMoverConfig.password = 'testtest1234';
      component.dataMoverConfig.passwordVerification = 'test';
      component.dataMoverConfig.passwordMinLength = 10;
      component.dmPasswordChanged(new Event('input'));
      component.dataMoverConfig.repositoryPassword = 'testesttest234';
      component.dataMoverConfig.repositoryPasswordVerification = 'test';
      component.dataMoverConfig.repositoryPasswordMinLength = 10;
      component.dmRepositoryPasswordChanged(new Event('input'));
      component.isDataMoverValid();
      // let button = de.query(By.css('#config-apps-dm-continue-btn'));
      // console.log(button);
      // button.nativeElement.click();
      // let save = de.query(By.css('#config-apps-save-btn'));
      // console.log(save);
      // save.nativeElement.click();
      finish();
    }
    function ecoSystemManager () {
      component.hasApp('ecosystemmanager');
      fixture.detectChanges();
      // let button = de.query(By.css('#config-apps-esm-continue-btn'));
      // console.log(button);
      // button.nativeElement.click();
      dataMover();
    }
    function dsu () {
      component.hasApp('dsu');
      fixture.detectChanges();
      component.dscConfig.password = 'testtest2345';
      component.dscConfig.passwordVerification = 'test';
      component.dscConfig.passwordMinLength = 10;
      component.dscPasswordChanged(new Event('input'));
      // let button = de.query(By.css('#config-apps-dsu-continue-btn'));
      // console.log(button);
      // button.nativeElement.click();
      component.isDSCValid();
      ecoSystemManager();
    }
    function rest () {
      component.hasApp('rest');
      fixture.detectChanges();
      // let button = de.query(By.css('#config-apps-sm-continue-btn'));
      // console.log(button);
      // button.nativeElement.click();
      dsu();
    }
    function serverManagement () {
      component.hasApp('servermanagement');
      fixture.detectChanges();
      component.serverManagementConfig.siteId = 2;
      component.serverManagementConfig.siteIdPattern = 'test';
      component.smSiteIdChanged(new Event('input'));
      component.serverManagementConfig.restPassword = 'test';
      component.serverManagementConfig.restPasswordVerification = 'test';
      component.serverManagementConfig.restPasswordMinLength = 10;
      component.serverManagementConfig.restPasswordMaxLength = 45;
      component.serverManagementConfig.restPasswordPattern = 'test';
      component.smPasswordChanged(new Event('input'));
      component.smRestPasswordChanged(new Event('input'));
      // let button = de.query(By.css('#config-apps-sm-continue-btn'));
      // console.log(button);
      // button.nativeElement.click();
      component.isServerManagementValid();
      rest();
    }
    function viewPoint () {
      component.hasApp('viewpoint');
      fixture.detectChanges();
      // let button = de.query(By.css('#config-apps-step1-continue-btn'));
      // console.log(button);
      // button.nativeElement.click();
      serverManagement();
    }
    function step1 () {
      fixture.detectChanges()
      component.dbConfig.nickname = 'test';
      component.dbConfig.systemName = 'test';
      component.dbConfig.password = 'test';
      component.dbConfig.passwordVerification = 'test';
      component.dbPasswordChanged(new Event('input'));
      fixture.detectChanges();
      component.isDbConfigValid();
      // let button = de.query(By.css('app-steps-layout'));
      // console.log(button);
      // button.nativeElement.click();
      viewPoint();
    }
    step1();
  })
});
