import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateOnlineRetailersComponent } from './add-update-online-retailers.component';

describe('AddUpdateOnlineRetailersComponent', () => {
  let component: AddUpdateOnlineRetailersComponent;
  let fixture: ComponentFixture<AddUpdateOnlineRetailersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateOnlineRetailersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateOnlineRetailersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
