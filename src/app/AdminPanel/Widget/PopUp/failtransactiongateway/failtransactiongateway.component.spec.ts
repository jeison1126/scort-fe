import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailtransactiongatewayComponent } from './failtransactiongateway.component';

describe('FailtransactiongatewayComponent', () => {
  let component: FailtransactiongatewayComponent;
  let fixture: ComponentFixture<FailtransactiongatewayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FailtransactiongatewayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FailtransactiongatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
