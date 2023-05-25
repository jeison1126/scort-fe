import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicevalidationComponent } from './invoicevalidation.component';

describe('InvoicevalidationComponent', () => {
  let component: InvoicevalidationComponent;
  let fixture: ComponentFixture<InvoicevalidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicevalidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicevalidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
