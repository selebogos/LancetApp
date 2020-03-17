import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyintillsComponent } from './moneyintills.component';

describe('MoneyintillsComponent', () => {
  let component: MoneyintillsComponent;
  let fixture: ComponentFixture<MoneyintillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyintillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyintillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
