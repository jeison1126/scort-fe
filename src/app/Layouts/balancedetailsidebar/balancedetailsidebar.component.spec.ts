import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalancedetailsidebarComponent } from './balancedetailsidebar.component';

describe('BalancedetailsidebarComponent', () => {
  let component: BalancedetailsidebarComponent;
  let fixture: ComponentFixture<BalancedetailsidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalancedetailsidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalancedetailsidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
