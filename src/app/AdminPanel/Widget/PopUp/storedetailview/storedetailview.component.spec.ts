import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoredetailviewComponent } from './storedetailview.component';

describe('StoredetailviewComponent', () => {
  let component: StoredetailviewComponent;
  let fixture: ComponentFixture<StoredetailviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoredetailviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoredetailviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
