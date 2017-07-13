import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';

import { InstanceSelectorComponent } from './instance-selector.component';

describe('InstanceSelectorComponent', () => {
  let component: InstanceSelectorComponent;
  let fixture: ComponentFixture<InstanceSelectorComponent>;
  let de: DebugElement;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstanceSelectorComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceSelectorComponent);
    element = fixture.nativeElement;
    de = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // test component rendering
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an instance option for each instanceOption', () => {
    component.instanceOptions = [
      {
        "ECU":0,
        "arch":["x86_64"],
        "ebs_iops":6000,
        "ebs_max_bandwidth":750,
        "ebs_optimized":true,
        "ebs_throughput":93.75,
        "enhanced_networking":true,
        "family":"General purpose",
        "generation":"current",
        "instance_type":"m4.xlarge",
        "linux_virtualization_types":["HVM"],
        "memory":16,
        "network_performance":"High",
        "pretty_name":"M4 Extra Large",
        "pricing":{},
        "storage":null,
        "vCPU":4,
        "vpc":{"ips_per_eni":15,"max_enis":4},
        "vpc_only":true
      },
      {
        "ECU":0,
        "arch":["x86_64"],
        "ebs_iops":8000,
        "ebs_max_bandwidth":1000,
        "ebs_optimized":true,
        "ebs_throughput":125,
        "enhanced_networking":true,
        "family":"General purpose",
        "generation":"current",
        "instance_type":"m4.2xlarge",
        "linux_virtualization_types":["HVM"],
        "memory":32,
        "network_performance":"High",
        "pretty_name":"M4 Double Extra Large",
        "pricing":{},
        "storage":null,
        "vCPU":8,
        "vpc":{"ips_per_eni":15,"max_enis":4},
        "vpc_only":true
      }];
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(de.queryAll(By.css('.instance-type')).length).toBe(2);
    })
  });

  it('should not render node selector if nodes is not set', () => {
    component.nodes = false;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(de.query(By.css('#node-selector'))).toBeFalsy();
    })
  });

  it('should render node selector if nodes is set', () => {
    component.nodes = 2;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(de.query(By.css('#node-selector'))).toBeTruthy();
    })
  });

  // test component data binding and events
  it('should update the instance type', () => {
    let instanceType = 'm4.2xlarge';
    component.typeChange.subscribe((type) => {
      expect(type).toEqual(instanceType)
    });
    component.updateType(instanceType);
  });

  it('should update the node count', () => {
    let count = '4';
    component.nodesChange.subscribe((nodes) => {
      expect(nodes).toEqual(count)
    });
    component.updateNodes(count);
  });
});
