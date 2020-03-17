import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomertypesComponent } from './customertypes.component';

describe('CustomertypesComponent', () => {
  let component: CustomertypesComponent;
  let fixture: ComponentFixture<CustomertypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomertypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomertypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
