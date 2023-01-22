import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateOemLocationsComponent } from './add-update-oem-locations.component';

describe('AddUpdateOemLocationsComponent', () => {
  let component: AddUpdateOemLocationsComponent;
  let fixture: ComponentFixture<AddUpdateOemLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateOemLocationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateOemLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
