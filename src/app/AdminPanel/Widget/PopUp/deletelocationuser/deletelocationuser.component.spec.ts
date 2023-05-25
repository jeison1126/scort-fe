import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletelocationuserComponent } from './deletelocationuser.component';

describe('DeletelocationuserComponent', () => {
  let component: DeletelocationuserComponent;
  let fixture: ComponentFixture<DeletelocationuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletelocationuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletelocationuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
