import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountdetailsComponent } from './discountdetails.component';

describe('DiscountdetailsComponent', () => {
  let component: DiscountdetailsComponent;
  let fixture: ComponentFixture<DiscountdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
