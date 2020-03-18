import { TestBed } from '@angular/core/testing';

import { NormalrangevalueService } from './normalrangevalue.service';

describe('NormalrangevalueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NormalrangevalueService = TestBed.get(NormalrangevalueService);
    expect(service).toBeTruthy();
  });
});
