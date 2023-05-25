import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinnancesidebaradmComponent } from './binnancesidebaradm.component';

describe('BinnancesidebaradmComponent', () => {
  let component: BinnancesidebaradmComponent;
  let fixture: ComponentFixture<BinnancesidebaradmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BinnancesidebaradmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BinnancesidebaradmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
