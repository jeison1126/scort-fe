import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuysellchartComponent } from './buysellchart.component';

describe('BuysellchartComponent', () => {
  let component: BuysellchartComponent;
  let fixture: ComponentFixture<BuysellchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuysellchartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuysellchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
