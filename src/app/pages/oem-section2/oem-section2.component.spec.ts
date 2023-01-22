import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OemSection2Component } from './oem-section2.component';

describe('OemSection2Component', () => {
  let component: OemSection2Component;
  let fixture: ComponentFixture<OemSection2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OemSection2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OemSection2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
