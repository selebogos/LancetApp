import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarnavigationComponent } from './sidebarnavigation.component';

describe('SidebarnavigationComponent', () => {
  let component: SidebarnavigationComponent;
  let fixture: ComponentFixture<SidebarnavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarnavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarnavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
