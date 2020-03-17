import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashonhandComponent } from './cashonhand.component';

describe('CashonhandComponent', () => {
  let component: CashonhandComponent;
  let fixture: ComponentFixture<CashonhandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashonhandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashonhandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
