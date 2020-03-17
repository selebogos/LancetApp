import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteditComponent } from './testedit.component';

describe('TesteditComponent', () => {
  let component: TesteditComponent;
  let fixture: ComponentFixture<TesteditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesteditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
