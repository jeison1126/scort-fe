import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonsigninComponent } from './commonsignin.component';

describe('CommonsigninComponent', () => {
  let component: CommonsigninComponent;
  let fixture: ComponentFixture<CommonsigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonsigninComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonsigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
