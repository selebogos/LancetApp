import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcustomertypeComponent } from './editcustomertype.component';

describe('EditcustomertypeComponent', () => {
  let component: EditcustomertypeComponent;
  let fixture: ComponentFixture<EditcustomertypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcustomertypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcustomertypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
