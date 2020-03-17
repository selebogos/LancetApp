import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyintilleditComponent } from './moneyintilledit.component';

describe('MoneyintilleditComponent', () => {
  let component: MoneyintilleditComponent;
  let fixture: ComponentFixture<MoneyintilleditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyintilleditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyintilleditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
