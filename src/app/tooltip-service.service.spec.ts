/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TooltipServiceService } from './tooltip-service.service';

describe('TooltipServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TooltipServiceService]
    });
  });

  it('should ...', inject([TooltipServiceService], (service: TooltipServiceService) => {
    expect(service).toBeTruthy();
  }));
});
