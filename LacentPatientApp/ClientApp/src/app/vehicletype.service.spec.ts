import { TestBed } from '@angular/core/testing';

import { VehicletypeService } from './vehicletype.service';

describe('VehicletypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VehicletypeService = TestBed.get(VehicletypeService);
    expect(service).toBeTruthy();
  });
});
