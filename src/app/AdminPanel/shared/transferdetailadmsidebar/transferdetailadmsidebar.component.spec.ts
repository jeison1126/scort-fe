import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferdetailadmsidebarComponent } from './transferdetailadmsidebar.component';

describe('TransferdetailadmsidebarComponent', () => {
  let component: TransferdetailadmsidebarComponent;
  let fixture: ComponentFixture<TransferdetailadmsidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferdetailadmsidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferdetailadmsidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
