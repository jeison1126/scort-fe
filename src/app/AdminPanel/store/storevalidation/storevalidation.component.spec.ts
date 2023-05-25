import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorevalidationComponent } from './storevalidation.component';

describe('StorevalidationComponent', () => {
  let component: StorevalidationComponent;
  let fixture: ComponentFixture<StorevalidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorevalidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorevalidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
