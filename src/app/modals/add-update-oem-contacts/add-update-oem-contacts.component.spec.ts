import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateOemContactsComponent } from './add-update-oem-contacts.component';

describe('AddUpdateOemContactsComponent', () => {
  let component: AddUpdateOemContactsComponent;
  let fixture: ComponentFixture<AddUpdateOemContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateOemContactsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateOemContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
