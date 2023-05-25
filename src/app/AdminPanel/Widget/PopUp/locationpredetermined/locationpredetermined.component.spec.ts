import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationpredeterminedComponent } from './locationpredetermined.component';

describe('LocationpredeterminedComponent', () => {
  let component: LocationpredeterminedComponent;
  let fixture: ComponentFixture<LocationpredeterminedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationpredeterminedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationpredeterminedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
