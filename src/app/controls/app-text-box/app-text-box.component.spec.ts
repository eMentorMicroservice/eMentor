import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTextBoxComponent } from './app-text-box.component';

describe('AppTextBoxComponent', () => {
  let component: AppTextBoxComponent;
  let fixture: ComponentFixture<AppTextBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppTextBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTextBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
