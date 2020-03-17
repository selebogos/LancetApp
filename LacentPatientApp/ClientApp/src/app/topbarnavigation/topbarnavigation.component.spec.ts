import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarnavigationComponent } from './topbarnavigation.component';

describe('TopbarnavigationComponent', () => {
  let component: TopbarnavigationComponent;
  let fixture: ComponentFixture<TopbarnavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopbarnavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarnavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
