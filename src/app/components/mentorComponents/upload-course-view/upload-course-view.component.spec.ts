import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCourseViewComponent } from './upload-course-view.component';

describe('UploadCourseViewComponent', () => {
  let component: UploadCourseViewComponent;
  let fixture: ComponentFixture<UploadCourseViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadCourseViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCourseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
