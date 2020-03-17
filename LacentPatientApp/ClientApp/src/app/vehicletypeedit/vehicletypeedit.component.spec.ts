import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicletypeeditComponent } from './vehicletypeedit.component';

describe('VehicletypeeditComponent', () => {
  let component: VehicletypeeditComponent;
  let fixture: ComponentFixture<VehicletypeeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicletypeeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicletypeeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
