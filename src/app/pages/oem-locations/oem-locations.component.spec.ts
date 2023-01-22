import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OemLocationsComponent } from './oem-locations.component';

describe('OemLocationsComponent', () => {
  let component: OemLocationsComponent;
  let fixture: ComponentFixture<OemLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OemLocationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OemLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
