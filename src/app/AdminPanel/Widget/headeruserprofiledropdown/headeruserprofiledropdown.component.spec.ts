import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderuserprofiledropdownComponent } from './headeruserprofiledropdown.component';

describe('HeaderuserprofiledropdownComponent', () => {
  let component: HeaderuserprofiledropdownComponent;
  let fixture: ComponentFixture<HeaderuserprofiledropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderuserprofiledropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderuserprofiledropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
