import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyprogramComponent } from './loyaltyprogram.component';

describe('LoyaltyprogramComponent', () => {
  let component: LoyaltyprogramComponent;
  let fixture: ComponentFixture<LoyaltyprogramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyaltyprogramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyprogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
