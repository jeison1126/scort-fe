import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderoneComponent } from './headerone.component';

describe('HeaderoneComponent', () => {
  let component: HeaderoneComponent;
  let fixture: ComponentFixture<HeaderoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
