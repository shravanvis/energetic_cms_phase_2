import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateApplicationsComponent } from './add-update-applications.component';

describe('AddUpdateApplicationsComponent', () => {
  let component: AddUpdateApplicationsComponent;
  let fixture: ComponentFixture<AddUpdateApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateApplicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
