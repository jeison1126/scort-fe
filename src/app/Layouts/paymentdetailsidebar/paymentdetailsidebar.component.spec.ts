import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentdetailsidebarComponent } from './paymentdetailsidebar.component';

describe('PaymentdetailsidebarComponent', () => {
  let component: PaymentdetailsidebarComponent;
  let fixture: ComponentFixture<PaymentdetailsidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentdetailsidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentdetailsidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
