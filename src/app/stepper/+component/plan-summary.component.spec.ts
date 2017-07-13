/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {DebugElement, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { PlanSummaryComponent } from './plan-summary.component';
import {TestingModule} from "../../../../testing/testing.module";
import {BuildPlan} from "../+models/build-plan";

describe('PlanSummaryComponent', () => {
  let component: PlanSummaryComponent;
  let fixture: ComponentFixture<PlanSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PlanSummaryComponent
      ],
      imports: [
        TestingModule
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanSummaryComponent);
    component = fixture.componentInstance;

    component.plan = new BuildPlan();

    fixture.changeDetectorRef.detectChanges();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
