/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {DebugElement, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { InputFieldComponent } from './input-field.component';
import {TestingModule} from "../../../../testing/testing.module";

describe('InputFieldComponent', () => {
  let component: InputFieldComponent;
  let fixture: ComponentFixture<InputFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InputFieldComponent
      ],
      imports: [
        TestingModule
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFieldComponent);
    component = fixture.componentInstance;
    fixture.changeDetectorRef.detectChanges();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should validate the values are identical if verification is required', () => {
    component.verification = 'true';
    component.triggerChanged({
      "value": "somevalue",
      "verification": "somevalue",
    });
    expect(component.verified).toBeTruthy();
  });

  it('should validate the values are identical if verification is required', () => {
    component.verification = 'true';
    component.triggerChanged({
      "value": "somevalue",
      "verification": "anothervalue",
    });
    expect(component.verified).toBeFalsy();
  });

  it('should validate the value minimum length', () => {
    component.minLength = 4;
    component.ngOnInit();
    const value = component.form.controls['value'];
    value.setValue('tt');
    expect(value.valid).toBeFalsy();
    expect(value.errors.minlength.requiredLength).toBe(4);
    expect(value.errors.minlength.actualLength).toBe(2);
    value.setValue('test');
    expect(value.valid).toBeTruthy();
  });

  it('should trigger the change event with value change', () => {

    component.value = 'abc';
    component.verification = 'abc';
    let data = {
      "value": component.value,
      "verification": component.verification
    }
    spyOn(component.changed, 'next');
    component.triggerChanged(data);
    fixture.detectChanges();
    expect(component.changed).toBeTruthy();
  });

  it('should validate the value max length', () => {
    component.maxLength = 4;
    component.ngOnInit();
    const value = component.form.controls['value'];
    value.setValue('tester');
    expect(value.valid).toBeFalsy();
    expect(value.errors.maxlength.requiredLength).toBe(4);
    expect(value.errors.maxlength.actualLength).toBe(6);
    value.setValue('test');
    expect(value.valid).toBeTruthy();
  });

  it('should validate the value max length', () => {
    component.pattern = '^[0-9]+$';
    component.ngOnInit();
    const value = component.form.controls['value'];
    value.setValue('123');
    expect(value.valid).toBeTruthy();
    value.setValue('abc');
    expect(value.valid).toBeFalsy();
  });

  it('should verify the values', () => {
    component.verification = 'true';
    component.ngOnInit();
    const value = component.form.controls['value'];
    const verification = component.form.controls['verification'];
    value.setValue('tester');
    expect(component.verified).toBeFalsy();
    verification.setValue('tester');
    expect(component.verified).toBeTruthy();
  });
});
