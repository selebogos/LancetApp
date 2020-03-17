import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WashtypeComponent } from './washtype.component';

describe('WashtypeComponent', () => {
  let component: WashtypeComponent;
  let fixture: ComponentFixture<WashtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WashtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WashtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
