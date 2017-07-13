import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { TdMediaService } from '@covalent/core';

import { BuildPlan } from '../+models';

@Component({
  selector: 'app-steps-layout',
  templateUrl: './steps-layout.component.html',
  styleUrls: ['./steps-layout.component.scss'],
})
export class StepsLayoutComponent implements OnInit, AfterViewInit {
  /** Build plan */
  plan: BuildPlan = new BuildPlan().storedAttributes();

  @Input() title: string;
  @Input() backTo: string;
  @Output() toggleSideNav: EventEmitter<void> = new EventEmitter<void>();
  @Input() backToLink: string;

  steps: any[] = [
    { icon: 'looks_one', title: 'Build Plan',             link: 'stepper',    disabled: true },
    { icon: 'looks_two', title: 'Verify Applications',    link: 'appverify',  disabled: true },
    { icon: 'looks_3',   title: 'Start Deployment',       link: 'tddbconfig', disabled: true },
    { icon: 'looks_4',   title: 'Configure Applications', link: 'appconfig',  disabled: true },
    { icon: 'looks_5',   title: 'Confirm and Deploy',     link: 'confirm',    disabled: true },
  ];

  constructor(
    private _route: ActivatedRoute,
    public  mediaService: TdMediaService) { this.toggleSideNav.subscribe(x => console.log('steps TOGGLE')) }

    get console() {
      return console;
    }

  ngOnInit(): void {
    this._route.url.subscribe((res: any) => {
      const segment: UrlSegment = res[0];
      const activeStep: any = this.steps.find((step: any) => step.link === segment.path);

      if (activeStep) {
        activeStep.active   = true;
        activeStep.disabled = false;
      }
    });
  }

  ngAfterViewInit(): void {
    this.mediaService.broadcast();
  }

  canGoBack(): boolean {
    if (this.backToLink === '/dashboard/stepper') {
      const json: any = JSON.parse(sessionStorage.getItem('nebulaBuildPlan'));

      if (json && json.planId) {
        return false;
      }
    }

    return true;
  }
}
