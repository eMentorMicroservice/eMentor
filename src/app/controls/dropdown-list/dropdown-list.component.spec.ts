import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDropdownListComponent } from './dropdown-list.component';

describe('AppDatePickerComponent', () => {
  let component: AppDropdownListComponent;
  let fixture: ComponentFixture<AppDropdownListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppDropdownListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDropdownListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
