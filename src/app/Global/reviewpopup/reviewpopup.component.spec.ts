import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewpopupComponent } from './reviewpopup.component';

describe('ReviewpopupComponent', () => {
  let component: ReviewpopupComponent;
  let fixture: ComponentFixture<ReviewpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
