import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistedbuyComponent } from './assistedbuy.component';

describe('AssistedbuyComponent', () => {
  let component: AssistedbuyComponent;
  let fixture: ComponentFixture<AssistedbuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssistedbuyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistedbuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
