/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {DebugElement, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';

import { StepsLayoutComponent } from './steps-layout.component';
import {TestingModule} from "../../../../testing/testing.module";

describe('StepsLayoutComponent', () => {
  let component: StepsLayoutComponent;
  let fixture: ComponentFixture<StepsLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StepsLayoutComponent
      ],
      imports: [
        TestingModule
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    TestBed.get(ActivatedRoute).url = ['stepper'];
    fixture = TestBed.createComponent(StepsLayoutComponent);
    component = fixture.componentInstance;
    fixture.changeDetectorRef.detectChanges();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should let you go back if the backto link is not the stepper root', () => {
    component.backToLink = 'something/else';
    expect(component.canGoBack()).toBeTruthy();
  });

  it('should let you go back if you are in the stepper root but have not started a build plan', () => {
    component.backToLink = '/dashboard/stepper';
    sessionStorage.removeItem('nebulaBuildPlan');
    expect(component.canGoBack()).toBeTruthy();
  });

  it('should not let you go back if you are in the stepper root and have a build plan in progress', () => {
    component.backToLink = '/dashboard/stepper';
    fixture.detectChanges();
    sessionStorage.setItem('nebulaBuildPlan', '{"planId": "tester"}');
    expect(component.canGoBack()).toBeFalsy();
  });
});
