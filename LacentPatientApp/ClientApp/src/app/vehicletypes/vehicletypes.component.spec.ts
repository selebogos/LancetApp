import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicletypesComponent } from './vehicletypes.component';

describe('VehicletypesComponent', () => {
  let component: VehicletypesComponent;
  let fixture: ComponentFixture<VehicletypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicletypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicletypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
