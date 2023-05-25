import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcartdataComponent } from './showcartdata.component';

describe('ShowcartdataComponent', () => {
  let component: ShowcartdataComponent;
  let fixture: ComponentFixture<ShowcartdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowcartdataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowcartdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
