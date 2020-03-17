import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WashtypedetailsComponent } from './washtypedetails.component';

describe('WashtypedetailsComponent', () => {
  let component: WashtypedetailsComponent;
  let fixture: ComponentFixture<WashtypedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WashtypedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WashtypedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
