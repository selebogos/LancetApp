import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyprogramdetailsComponent } from './loyaltyprogramdetails.component';

describe('LoyaltyprogramdetailsComponent', () => {
  let component: LoyaltyprogramdetailsComponent;
  let fixture: ComponentFixture<LoyaltyprogramdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyaltyprogramdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyprogramdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
