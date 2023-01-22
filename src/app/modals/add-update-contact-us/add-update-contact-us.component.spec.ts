import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateContactUsComponent } from './add-update-contact-us.component';

describe('AddUpdateContactUsComponent', () => {
  let component: AddUpdateContactUsComponent;
  let fixture: ComponentFixture<AddUpdateContactUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateContactUsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
