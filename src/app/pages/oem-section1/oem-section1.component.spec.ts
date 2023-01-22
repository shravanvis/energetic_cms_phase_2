import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OemSection1Component } from './oem-section1.component';

describe('OemSection1Component', () => {
  let component: OemSection1Component;
  let fixture: ComponentFixture<OemSection1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OemSection1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OemSection1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
