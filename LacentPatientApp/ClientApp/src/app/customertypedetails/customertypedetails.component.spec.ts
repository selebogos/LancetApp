import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomertypedetailsComponent } from './customertypedetails.component';

describe('CustomertypedetailsComponent', () => {
  let component: CustomertypedetailsComponent;
  let fixture: ComponentFixture<CustomertypedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomertypedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomertypedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
