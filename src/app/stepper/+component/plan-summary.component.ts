import { Component, Input } from '@angular/core';
import { BuildPlan } from '../+models';

@Component({
  selector: 'app-plan-summary',
  templateUrl: './plan-summary.component.html',
  styleUrls: ['./plan-summary.component.scss'],
})
export class PlanSummaryComponent {
  @Input() plan: BuildPlan;
}
