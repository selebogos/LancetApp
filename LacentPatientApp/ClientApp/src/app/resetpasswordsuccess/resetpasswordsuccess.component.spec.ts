import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpasswordsuccessComponent } from './resetpasswordsuccess.component';

describe('ResetpasswordsuccessComponent', () => {
  let component: ResetpasswordsuccessComponent;
  let fixture: ComponentFixture<ResetpasswordsuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetpasswordsuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetpasswordsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
