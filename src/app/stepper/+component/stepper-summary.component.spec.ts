/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {DebugElement, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';

import {TestingModule} from "../../../../testing/testing.module";
import {StepperSummaryComponent} from "./stepper-summary.component";

describe('StepperSummaryComponent', () => {
  let component: StepperSummaryComponent;
  let fixture: ComponentFixture<StepperSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StepperSummaryComponent
      ],
      imports: [
        TestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    TestBed.get(ActivatedRoute).url = ['stepper'];
    fixture = TestBed.createComponent(StepperSummaryComponent);
    component = fixture.componentInstance;
    fixture.changeDetectorRef.detectChanges();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
