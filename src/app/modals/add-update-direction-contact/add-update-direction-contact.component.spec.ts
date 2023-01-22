import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateDirectionContactComponent } from './add-update-direction-contact.component';

describe('AddUpdateDirectionContactComponent', () => {
  let component: AddUpdateDirectionContactComponent;
  let fixture: ComponentFixture<AddUpdateDirectionContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateDirectionContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateDirectionContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
