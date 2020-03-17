import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicletypedetailsComponent } from './vehicletypedetails.component';

describe('VehicletypedetailsComponent', () => {
  let component: VehicletypedetailsComponent;
  let fixture: ComponentFixture<VehicletypedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicletypedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicletypedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
