import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopuphomeComponent } from './popuphome.component';

describe('PopuphomeComponent', () => {
  let component: PopuphomeComponent;
  let fixture: ComponentFixture<PopuphomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopuphomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopuphomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
