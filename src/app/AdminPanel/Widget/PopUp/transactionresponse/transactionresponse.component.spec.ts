import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionresponseComponent } from './transactionresponse.component';

describe('TransactionresponseComponent', () => {
  let component: TransactionresponseComponent;
  let fixture: ComponentFixture<TransactionresponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionresponseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionresponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
