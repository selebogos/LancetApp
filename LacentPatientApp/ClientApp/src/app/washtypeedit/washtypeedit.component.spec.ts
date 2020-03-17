import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WashtypeeditComponent } from './washtypeedit.component';

describe('WashtypeeditComponent', () => {
  let component: WashtypeeditComponent;
  let fixture: ComponentFixture<WashtypeeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WashtypeeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WashtypeeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
