import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingplanComponent } from './pricingplan.component';

describe('PricingplanComponent', () => {
  let component: PricingplanComponent;
  let fixture: ComponentFixture<PricingplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
