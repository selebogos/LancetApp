import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashonhanddetailsComponent } from './cashonhanddetails.component';

describe('CashonhanddetailsComponent', () => {
  let component: CashonhanddetailsComponent;
  let fixture: ComponentFixture<CashonhanddetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashonhanddetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashonhanddetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
