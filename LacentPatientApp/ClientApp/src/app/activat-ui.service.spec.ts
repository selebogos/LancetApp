import { TestBed } from '@angular/core/testing';

import { ActivatUIService } from './activat-ui.service';

describe('ActivatUIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActivatUIService = TestBed.get(ActivatUIService);
    expect(service).toBeTruthy();
  });
});
