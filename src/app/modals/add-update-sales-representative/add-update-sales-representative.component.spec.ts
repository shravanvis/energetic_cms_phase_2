import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateSalesRepresentativeComponent } from './add-update-sales-representative.component';

describe('AddUpdateSalesRepresentativeComponent', () => {
  let component: AddUpdateSalesRepresentativeComponent;
  let fixture: ComponentFixture<AddUpdateSalesRepresentativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateSalesRepresentativeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateSalesRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
