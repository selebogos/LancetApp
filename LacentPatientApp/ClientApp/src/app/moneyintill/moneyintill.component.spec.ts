import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyintillComponent } from './moneyintill.component';

describe('MoneyintillComponent', () => {
  let component: MoneyintillComponent;
  let fixture: ComponentFixture<MoneyintillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyintillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyintillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
