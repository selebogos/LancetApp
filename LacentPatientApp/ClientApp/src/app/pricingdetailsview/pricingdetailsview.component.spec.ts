import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingdetailsviewComponent } from './pricingdetailsview.component';

describe('PricingdetailsviewComponent', () => {
  let component: PricingdetailsviewComponent;
  let fixture: ComponentFixture<PricingdetailsviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingdetailsviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingdetailsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
