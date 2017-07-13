// Angular
import { async, fakeAsync, inject, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement} from '@angular/core';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { Response, ResponseOptions, Headers, Http, HttpModule, BaseRequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs';
// Vendor
import { CovalentCoreModule } from '@covalent/core';

// Nebula
import {
  /** ngModule dependencies */
  STEPPER_COMPONENTS,
  STEPPER_ENTRY_COMPONENTS,
  STEPPER_SERVICES,

  /** route dependencies */
  BuildPlanComponent,
  VerifyAppsComponent,
  ConfigDeployComponent,
  ConfigAppsComponent,
  ReviewComponent } from '../';
import { AccountsService } from '../../../modules/nebula-api/src/services/accounts.service';
import { NebulaService } from '../../../modules/nebula-api/src/services/nebula.service';
import { TokenService } from '../../../modules/nebula-api/src/services/token.service';
import { Sizing } from '../+models';
import { ErrorDialogService, HttpService, tooltipservice, BuildPlanService, LoaderService } from '../services';


import 'hammerjs/hammer';

// mock-api
import { TestingModule } from "../../../../testing/testing.module";
import { MockHttpService } from '../../../../mock-api/mock-http.service';
import { Apiurl } from '../../../../mock-api/mock-api-url';
import { fakeBackendProvider } from '../../../../mock-api/mock-backend';

class RouterSpy {
  public navigate(): any {
    return jasmine.createSpy('navigate');
  }
}

class SizingSpy {
  public loadInstanceDetails(): any {
    return jasmine.createSpy('instances');
  }
}

describe('Component: BuildPlanComponent', () => {

  let component: BuildPlanComponent;
  let de: DebugElement;
  let element: HTMLElement;
  let fixture: ComponentFixture<BuildPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BuildPlanComponent
      ],
      imports: [
        CovalentCoreModule,
        TestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],

      providers: [
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions,
        {provide: HttpService, useClass: MockHttpService},
        {provide: Router, useClass: RouterSpy},
        {provide: Sizing, useClass: SizingSpy},
        LoaderService,
        BuildPlanService,
        ErrorDialogService,
        Apiurl,
        tooltipservice
      ]
    });
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BuildPlanComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    de = fixture.debugElement;
    sessionStorage.removeItem('plan_id');
    fixture.detectChanges();
  }));


  xit('should compile the component', async(() => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(de.queryAll(By.css('app-steps-layout'))).toBeDefined();
    })
  }));

  xit('should disable if the user has not completed step1', () => {
    let de = fixture.debugElement.query(By.css('#step1-continue-button')).nativeElement;
    expect(de).toBeTruthy();
  });

  xit('should enable continue to step 2 when the form is complete', () => {
    component.plan.name = "abc";
    component.plan.description = 'xyz';
    let de = fixture.debugElement.query(By.css('#step1-continue-button')).nativeElement;
    expect(de.getAttribute('disabled')).toBeFalsy();
  });

  xit('should disable if the user has not completed step2', () => {
    let de = fixture.debugElement.query(By.css('#step2-continue-button')).nativeElement;
    expect(de).toBeTruthy();
  });

  xit('should parse the response from the observable', () => {
    component.loadPlan();
  });
   /*it('It should parse the get response from the observable' (),
   async(inject([component.loadPlan, MockBackend], (loadplan: component.loadPlan, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify({message: "test response"})
            })));
        });
      service.getProductSizings('test', {test: 'params'}).subscribe((response) => {
        expect(response.message).toEqual('test response');
      });
    }))); */
 /*it('should enable continue to step 2 when the form is complete', () => {
    component.plan.storageType = true;
    component.plan.storageMedia = '';
    component.plan.storageEncryption = 'yes';
    component.plan.nodeCount = 5;
    let de = fixture.debugElement.query(By.css('#step1-continue-button')).nativeElement;
    expect(de.getAttribute('disabled')).toBeFalsy();
  }); */

});

