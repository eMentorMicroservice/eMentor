import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawViewComponent } from './withdraw-view.component';

describe('WithdrawViewComponent', () => {
  let component: WithdrawViewComponent;
  let fixture: ComponentFixture<WithdrawViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
