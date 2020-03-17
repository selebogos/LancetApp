import { TestBed } from '@angular/core/testing';

import { WashtypeService } from './washtype.service';

describe('WashtypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WashtypeService = TestBed.get(WashtypeService);
    expect(service).toBeTruthy();
  });
});
