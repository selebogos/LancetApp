import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WashtypesComponent } from './washtypes.component';

describe('WashtypesComponent', () => {
  let component: WashtypesComponent;
  let fixture: ComponentFixture<WashtypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WashtypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WashtypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
