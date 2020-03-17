import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingdetailseditComponent } from './pricingdetailsedit.component';

describe('PricingdetailseditComponent', () => {
  let component: PricingdetailseditComponent;
  let fixture: ComponentFixture<PricingdetailseditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingdetailseditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingdetailseditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
