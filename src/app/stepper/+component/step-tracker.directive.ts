import { Directive, Input, forwardRef, AfterViewInit, Inject } from '@angular/core';
import { TdStepsComponent, TdStepComponent } from '@covalent/core';

@Directive({
  selector: '[tdStepTracker]',
})
export class StepTrackerDirective implements AfterViewInit {
  @Input('tdStepTracker') sectionKey: any;

  constructor(@Inject(forwardRef(() => TdStepsComponent)) private _steps: TdStepsComponent) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      let activeStep: TdStepComponent;

      this._steps.steps.forEach((step: TdStepComponent) => {
        const key: string = `${this.sectionKey}.${step.label}`;
        const state: string = sessionStorage.getItem(key);
        step.state = <any>state;

        if (!activeStep && state !== 'complete') {
          activeStep = step;
        }

        step.onDeactivated.subscribe(() => {
          sessionStorage.setItem(key, `${step.state}`);
        });
      });

      if (activeStep) {
        activeStep.active = true;
      }
    });
  }
}
