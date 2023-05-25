import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicationdetailsidebarComponent } from './ubicationdetailsidebar.component';

describe('UbicationdetailsidebarComponent', () => {
  let component: UbicationdetailsidebarComponent;
  let fixture: ComponentFixture<UbicationdetailsidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UbicationdetailsidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UbicationdetailsidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
