import { TestBed } from '@angular/core/testing';

import { PatientdetailsService } from './patientdetails.service';

describe('PatientdetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PatientdetailsService = TestBed.get(PatientdetailsService);
    expect(service).toBeTruthy();
  });
});
