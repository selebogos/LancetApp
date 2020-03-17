import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingdetailsComponent } from './pricingdetails.component';

describe('PricingdetailsComponent', () => {
  let component: PricingdetailsComponent;
  let fixture: ComponentFixture<PricingdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
