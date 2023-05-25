import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailerrortransactiongatewayComponent } from './failerrortransactiongateway.component';

describe('FailerrortransactiongatewayComponent', () => {
  let component: FailerrortransactiongatewayComponent;
  let fixture: ComponentFixture<FailerrortransactiongatewayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FailerrortransactiongatewayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FailerrortransactiongatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
