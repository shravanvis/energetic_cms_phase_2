import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OemContactComponent } from './oem-contact.component';

describe('OemContactComponent', () => {
  let component: OemContactComponent;
  let fixture: ComponentFixture<OemContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OemContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OemContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
