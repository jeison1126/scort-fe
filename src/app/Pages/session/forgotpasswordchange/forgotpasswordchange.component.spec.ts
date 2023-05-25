import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpasswordchangeComponent } from './forgotpasswordchange.component';

describe('ForgotpasswordchangeComponent', () => {
  let component: ForgotpasswordchangeComponent;
  let fixture: ComponentFixture<ForgotpasswordchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotpasswordchangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotpasswordchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
