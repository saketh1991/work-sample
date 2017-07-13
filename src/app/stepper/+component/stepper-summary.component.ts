import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stepper-summary',
  templateUrl: './stepper-summary.component.html',
  styleUrls: ['./stepper-summary.component.scss'],
})
export class StepperSummaryComponent {
  @Input() labels: any[];
  @Input() values: any[];
  @Input() highlight: string;
}
