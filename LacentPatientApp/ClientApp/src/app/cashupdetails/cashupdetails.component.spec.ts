import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashupdetailsComponent } from './cashupdetails.component';

describe('CashupdetailsComponent', () => {
  let component: CashupdetailsComponent;
  let fixture: ComponentFixture<CashupdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashupdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashupdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
