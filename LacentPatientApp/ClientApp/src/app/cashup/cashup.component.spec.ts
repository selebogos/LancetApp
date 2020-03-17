import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashupComponent } from './cashup.component';

describe('CashupComponent', () => {
  let component: CashupComponent;
  let fixture: ComponentFixture<CashupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
