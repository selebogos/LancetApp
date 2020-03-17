import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashonhandsComponent } from './cashonhands.component';

describe('CashonhandsComponent', () => {
  let component: CashonhandsComponent;
  let fixture: ComponentFixture<CashonhandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashonhandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashonhandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
