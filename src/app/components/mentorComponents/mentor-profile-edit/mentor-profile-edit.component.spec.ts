import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorProfileEditComponent } from './mentor-profile-edit.component';

describe('MentorProfileEditComponent', () => {
  let component: MentorProfileEditComponent;
  let fixture: ComponentFixture<MentorProfileEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorProfileEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
