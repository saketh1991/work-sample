/* tslint:disable:no-unused-variable */
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// without CUSTOM_ELEMENTS_SCHEMA: big performance cost
import { APP_BASE_HREF } from '@angular/common';
import { AppModule } from '../app.module';
// Nebula App
import { InstanceCalculatorComponent } from './instance-calculator.component';
import afterEach = testing.afterEach;
import {TestingModule} from "../../../testing/testing.module";
describe('InstanceCalculatorComponent', () => {
  let component: InstanceCalculatorComponent;
  let fixture: ComponentFixture<InstanceCalculatorComponent>;
  beforeEach(async(()=> {
    let bundle = {
      name: 'test',
      id: 33,
      code: 33,
      color: 'blue',
      database: ['Columnar', 'Temporal', 'Row-Level Security', 'Secure Zones'],
      description: 'test',
      products: ['base','enterprise','advanced','developer'],
      specifics: 'nebula',
      storages: { local: ['HDD','SSD'], network: ['EBS_SSD'] },
    };
    let instanceCalculator = {
      appplan: 'base',
      appvolume: 123,
      selected_instance: 'd2.xlarge',
      total_storage: 12,
      total_vcore: 4,
      total_memory: 30.5,
      applications: [],
      additional_features: [],
      appname: 'test',
      storage_Type: 'HDD',
      appstorage: 'local',
      throughput: 'High',
      network_performance: 'High'
    }
    let additionalFeatures = ['Viewpoint', 'server-Mangement','Rest Services',' ecosystemmanger','Data stream controller','datamover' ];
    let apps = ['one', 'two'];
    sessionStorage.setItem('bundle', JSON.stringify(bundle));
    sessionStorage.setItem('apps', JSON.stringify(apps));
    sessionStorage.setItem('additional_features', JSON.stringify(additionalFeatures));
    sessionStorage.setItem('instance_calculator', JSON.stringify(instanceCalculator));
  }))
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [ InstanceCalculatorComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
  }));
  beforeEach(async(() => {
    fixture = TestBed.createComponent(InstanceCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('should create instance', () => {
    expect(component).toBeTruthy();
    sessionStorage.removeItem('bundle');
    sessionStorage.removeItem('apps');
    sessionStorage.removeItem('additional_features');
    sessionStorage.removeItem('instance_calculator');
  });
  afterAll(async(() => {
      sessionStorage.removeItem('bundle');
      sessionStorage.removeItem('apps');
      sessionStorage.removeItem('additional_features');
      sessionStorage.removeItem('instance_calculator');
    }
  ));
});
