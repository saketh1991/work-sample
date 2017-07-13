// Angular
import {async, fakeAsync, inject, TestBed, ComponentFixture} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {NgModule, Component, DebugElement, ViewContainerRef,CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {BaseRequestOptions } from '@angular/http';
import {MdDialogModule} from '@angular/material';
import {MockBackend} from '@angular/http/testing';
import { TdStepComponent, StepState } from '@covalent/core';

// third party
import {Observable} from 'rxjs';
import 'hammerjs/hammer';

// Covalent
import {CovalentCoreModule} from '@covalent/core';

// Nebula
import {BuildPlan } from '../+models';
import {NewCredentialDialogComponent, NewSecurityKeyDialogComponent} from '../+dialog';
import {DataService,
  HttpService,
  BuildPlanService,
  MessagingService,
  CloudCredentialService,
  tooltipservice,
  ErrorDialogService,
  LoaderService } from '../services';
// Nebula App
import { /** ngModule dependencies */
  STEPPER_COMPONENTS,
  STEPPER_ENTRY_COMPONENTS,
  STEPPER_SERVICES,
  /** route dependencies */
  BuildPlanComponent,
  VerifyAppsComponent,
  ConfigDeployComponent,
  ConfigAppsComponent,
  ReviewComponent } from '../';

// Mock-api
import { TestingModule } from "../../../../testing/testing.module";
import { MockHttpService } from '../../../../mock-api/mock-http.service';
import { Apiurl } from '../../../../mock-api/mock-api-url';
import { fakeBackendProvider } from '../../../../mock-api/mock-backend';

import { AccountsService } from '../../../modules/nebula-api/src/services/accounts.service';
import { NebulaService } from '../../../modules/nebula-api/src/services/nebula.service';
import { TokenService } from '../../../modules/nebula-api/src/services/token.service';

@Component({
  selector: 'test-component',
  template: ``
})

export class TestComponent {}

@NgModule({
  declarations: [TestComponent ],
  entryComponents: [TestComponent, NewSecurityKeyDialogComponent],
  exports: [TestComponent],
  imports: [ TestingModule ]
})
class TestModule { }

describe('Component: Stepper > ConfigDeployComponent', () => {

  let component;
  let de: DebugElement;
  let element: HTMLElement;
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        ConfigDeployComponent,
        NewCredentialDialogComponent,
        NewSecurityKeyDialogComponent,

      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
      imports: [
        CovalentCoreModule,
        RouterTestingModule,
        FormsModule,
        TestModule,
        MdDialogModule.forRoot(),

      ],
      providers: [
        ViewContainerRef,
        STEPPER_SERVICES,
        AccountsService,
        NebulaService,
        TokenService,
        tooltipservice,
        {provide: HttpService, useClass: MockHttpService},
        {provide: ActivatedRoute,
          useValue: { 'queryParams': Observable.from([{ 'edit': true }]) }
        },
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions,
        Apiurl,
        ErrorDialogService,
        LoaderService,
        BuildPlan,
        BuildPlanService,
        MessagingService,
        CloudCredentialService,
        ErrorDialogService,
        DataService,

      ]
    });
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(ConfigDeployComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    de = fixture.debugElement;
    component.isEditing = true;
    component.isLoading = false;
    component.ngOnInit();
    fixture.detectChanges();
  }));


  it('should compile the component', fakeAsync(() => {
    expect(component).toBeTruthy();
  }));

  it('should disable the continue button if the region is not selected', () => {

    de = fixture.debugElement.query(By.css('#regionContinue'));
    let el = de.nativeElement.disabled;
    expect(el).toBeTruthy();
  });

  it('should enable the continue button if the region is selected', () => {

    component.region = 'us-east-1';
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('#regionContinue'));
    let el = de.nativeElement.disabled;
    expect(el).toBeFalsy();
  });

  it('should disable the continue button if the region is not selected', () => {

    de = fixture.debugElement.query(By.css('#vpcContinue'));
    let el = de.nativeElement.disabled;
    expect(el).toBeTruthy();
  });

  it('should enable the continue button if the vpc is selected', () => {

    component.vpc = 'Sandbox VPC - 172.31.0.0/16';
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('#vpcContinue'));
    let el = de.nativeElement.disabled;
    expect(el).toBeFalsy();
  });

  it('should disable the continue button if the region is not selected', () => {

    de = fixture.debugElement.query(By.css('#availabilityZone'));
    let el = de.nativeElement.disabled;
    expect(el).toBeTruthy();
  });

  it('should enable the continue button if the availabilityZone is selected', () => {

    component.availabilityZone = 'us-east-1a';
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('#availabilityZone'));
    let el = de.nativeElement.disabled;
    expect(el).toBeFalsy();
  });

  
  it('should enable the continue button if the Subnet is selected', () => {
    de = fixture.debugElement.query(By.css('#SubnetContiue'));
    let el = de.nativeElement.disabled;
    expect(el).toBeTruthy();
  }); 

  it('should enable the continue button if the Subnet is selected', () => {
     component.availabilityZone = 'us-east-1a';
     de = fixture.debugElement.query(By.css('#availabilityZone'));
     de.nativeElement.click();
     fixture.detectChanges();
     expect(component.reuseSubnet).toBeTruthy();
  }); 

  it('should enable the continue button when the security key is selected', () => {
    de = fixture.debugElement.query(By.css('#securityKeyContinue'));
    let el = de.nativeElement.disabled;
    expect(el).toBeTruthy();
  });

  it('should enable the continue button when the security key is selected', () => {
    component.securityKey = 'some key'; 
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('#securityKeyContinue'));
    let el = de.nativeElement.disabled;
    expect(el).toBeFalsy();
  });
  
  /*
  it ('login button should navigate the user to login screen', () => {
     de = fixture.debugElement.query(By.css('#logBtn'));
     el = de.nativeElement;
     el.click();
     let router = TestBed.get(Router);
     expect(router.url[0]).toEqual('/login');
  });
  */
  // it('should test the stepper', () => {
  //
  //   function step5(): any {
  //     component.canSave();
  //     component.securityKey = 'testest';
  //     component.securityKeys = ['test', 'testy'];
  //     fixture.detectChanges();
  //     let addKeyBtn = de.query(By.css('#config-deploy-add-key-btn'));
  //     addKeyBtn.nativeElement.click();
  //     fixture.detectChanges();
  //     let button = de.query(By.css('#config-deploy-ssh-btn'));
  //     button.nativeElement.click();
  //     component.saveButtonLabel = 'saved';
  //     fixture.detectChanges();
  //     let saveBtn = de.query(By.css('#config-deploy-save-btn'));
  //     expect(component.canSave()).toBe(true);
  //     saveBtn.nativeElement.click();
  //     component.loadSettings();
  //
  //     let keys = {
  //       "keys": [{
  //         keyname: 'test',
  //         aws: {
  //           aws_access_key: 'q34f45yuq45yg',
  //           aws_secret_key: 'q324rqawdgfqa34yhq'
  //         }
  //       }]
  //
  //     };
  //
  //     fixture.detectChanges();
  //     component.setSecurityKeys(keys);
  //     component.loadKeys();
  //   }
  //
  //   function step4(): any {
  //     component.subnetCidr = 'cidr';
  //     component.subnetName = 'CIDR';
  //     component.handleError(new Error('test error handle'), 'config-deploy');
  //     fixture.detectChanges();
  //     let button = de.query(By.css('#config-deploy-subnet-btn'));
  //     button.nativeElement.click();
  //     step5();
  //   }
  //
  //   function step3(): any {
  //     component.availabilityZone = 'us-east-1a';
  //     fixture.detectChanges();
  //     let button = de.query(By.css('#config-deploy-zone-btn'));
  //     button.nativeElement.click();
  //     step4();
  //   }
  //
  //   function step2(): any {
  //     component.vpc = 'vpc-100001';
  //     fixture.detectChanges();
  //     let button = de.query(By.css('#config-deploy-vpc-btn'));
  //     button.nativeElement.click();
  //     step3();
  //   }
  //
  //   function step1(): any {
  //     component.availabilityZone = 'us-east-1';
  //     component.availabilityZones = ['us-east', 'us-west'];
  //     component.regionZonesMapping = 'us-east';
  //     component.regions = ['us-east', 'us-west'];
  //     component.region = 'us-east';
  //     expect(component.isEditing).toBe(true);
  //     fixture.detectChanges();
  //     // button does not exist
  //     //let button = de.query(By.css('#config-deploy-region-btn'));
  //     //button.nativeElement.click();
  //     step2();
  //   }
  //
  //   step1();
  //
  // });
});
