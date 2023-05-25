import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposdemenuComponent } from './tiposdemenu.component';

describe('TiposdemenuComponent', () => {
  let component: TiposdemenuComponent;
  let fixture: ComponentFixture<TiposdemenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposdemenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposdemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
