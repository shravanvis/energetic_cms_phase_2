import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateOemSection1Component } from './add-update-oem-section1.component';

describe('AddUpdateOemSection1Component', () => {
  let component: AddUpdateOemSection1Component;
  let fixture: ComponentFixture<AddUpdateOemSection1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateOemSection1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateOemSection1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
