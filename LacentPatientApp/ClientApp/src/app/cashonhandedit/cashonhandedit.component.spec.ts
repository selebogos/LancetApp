import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashonhandeditComponent } from './cashonhandedit.component';

describe('CashonhandeditComponent', () => {
  let component: CashonhandeditComponent;
  let fixture: ComponentFixture<CashonhandeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashonhandeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashonhandeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
