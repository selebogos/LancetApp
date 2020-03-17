import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitiondetailsComponent } from './requisitiondetails.component';

describe('RequisitiondetailsComponent', () => {
  let component: RequisitiondetailsComponent;
  let fixture: ComponentFixture<RequisitiondetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitiondetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitiondetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
