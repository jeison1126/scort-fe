import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeelistdialogComponent } from './seelistdialog.component';

describe('SeelistdialogComponent', () => {
  let component: SeelistdialogComponent;
  let fixture: ComponentFixture<SeelistdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeelistdialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeelistdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
