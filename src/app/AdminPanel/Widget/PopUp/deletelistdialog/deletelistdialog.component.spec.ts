import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletelistdialogComponent } from './deletelistdialog.component';

describe('DeletelistdialogComponent', () => {
  let component: DeletelistdialogComponent;
  let fixture: ComponentFixture<DeletelistdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletelistdialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletelistdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
