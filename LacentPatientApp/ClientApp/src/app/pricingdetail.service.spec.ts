import { TestBed } from '@angular/core/testing';

import { PricingdetailService } from './pricingdetail.service';

describe('PricingdetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PricingdetailService = TestBed.get(PricingdetailService);
    expect(service).toBeTruthy();
  });
});
