import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpecialProductComponent } from './add-special-product.component';

describe('AddSpecialProductComponent', () => {
  let component: AddSpecialProductComponent;
  let fixture: ComponentFixture<AddSpecialProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSpecialProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSpecialProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
