import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinnancleComponent } from './binnancle.component';

describe('BinnancleComponent', () => {
  let component: BinnancleComponent;
  let fixture: ComponentFixture<BinnancleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BinnancleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BinnancleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
