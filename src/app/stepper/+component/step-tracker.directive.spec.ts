import { StepTrackerDirective } from './step-tracker.directive';
import {TdStepsComponent} from "@covalent/core";

describe('StepTrackerDirective', () => {
  it('should create an instance', () => {
    const tdSteps = new TdStepsComponent();
    const directive = new StepTrackerDirective(tdSteps);
    expect(directive).toBeTruthy();
  });
  //todo get stubs for td stepper and finish testing directive
});
