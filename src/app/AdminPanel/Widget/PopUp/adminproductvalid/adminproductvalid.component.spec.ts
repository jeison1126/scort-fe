import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminproductvalidComponent } from './adminproductvalid.component';

describe('AdminproductvalidComponent', () => {
  let component: AdminproductvalidComponent;
  let fixture: ComponentFixture<AdminproductvalidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminproductvalidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminproductvalidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
