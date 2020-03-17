import { TestBed } from '@angular/core/testing';

import { LoyaltyprogramService } from './loyaltyprogram.service';

describe('LoyaltyprogramService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoyaltyprogramService = TestBed.get(LoyaltyprogramService);
    expect(service).toBeTruthy();
  });
});
