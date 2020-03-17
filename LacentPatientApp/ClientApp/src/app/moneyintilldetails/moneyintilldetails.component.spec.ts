import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyintilldetailsComponent } from './moneyintilldetails.component';

describe('MoneyintilldetailsComponent', () => {
  let component: MoneyintilldetailsComponent;
  let fixture: ComponentFixture<MoneyintilldetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyintilldetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyintilldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
