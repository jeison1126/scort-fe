import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicestoreComponent } from './invoicestore.component';

describe('InvoicestoreComponent', () => {
  let component: InvoicestoreComponent;
  let fixture: ComponentFixture<InvoicestoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicestoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
