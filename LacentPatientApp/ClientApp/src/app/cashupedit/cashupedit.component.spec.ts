import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashupeditComponent } from './cashupedit.component';

describe('CashupeditComponent', () => {
  let component: CashupeditComponent;
  let fixture: ComponentFixture<CashupeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashupeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashupeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
