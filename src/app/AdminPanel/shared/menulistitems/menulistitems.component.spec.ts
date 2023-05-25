import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenulistitemsComponent } from './menulistitems.component';

describe('MenulistitemsComponent', () => {
  let component: MenulistitemsComponent;
  let fixture: ComponentFixture<MenulistitemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenulistitemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenulistitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
