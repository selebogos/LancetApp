import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitioneditComponent } from './requisitionedit.component';

describe('RequisitioneditComponent', () => {
  let component: RequisitioneditComponent;
  let fixture: ComponentFixture<RequisitioneditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitioneditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitioneditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
