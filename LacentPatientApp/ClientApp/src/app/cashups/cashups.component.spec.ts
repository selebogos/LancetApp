import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashupsComponent } from './cashups.component';

describe('CashupsComponent', () => {
  let component: CashupsComponent;
  let fixture: ComponentFixture<CashupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
