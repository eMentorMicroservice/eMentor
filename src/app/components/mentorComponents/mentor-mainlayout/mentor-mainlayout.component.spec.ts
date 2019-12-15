import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorMainlayoutComponent } from './mentor-mainlayout.component';

describe('MentorMainlayoutComponent', () => {
  let component: MentorMainlayoutComponent;
  let fixture: ComponentFixture<MentorMainlayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorMainlayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorMainlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
