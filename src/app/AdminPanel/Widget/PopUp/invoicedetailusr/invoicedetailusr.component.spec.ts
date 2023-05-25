import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicedetailusrComponent } from './invoicedetailusr.component';

describe('InvoicedetailusrComponent', () => {
  let component: InvoicedetailusrComponent;
  let fixture: ComponentFixture<InvoicedetailusrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicedetailusrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicedetailusrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
