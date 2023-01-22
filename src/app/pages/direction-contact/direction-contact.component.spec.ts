import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionContactComponent } from './direction-contact.component';

describe('DirectionContactComponent', () => {
  let component: DirectionContactComponent;
  let fixture: ComponentFixture<DirectionContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectionContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectionContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
