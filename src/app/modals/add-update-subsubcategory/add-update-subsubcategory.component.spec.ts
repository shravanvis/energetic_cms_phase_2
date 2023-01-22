import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateSubsubcategoryComponent } from './add-update-subsubcategory.component';

describe('AddUpdateSubsubcategoryComponent', () => {
  let component: AddUpdateSubsubcategoryComponent;
  let fixture: ComponentFixture<AddUpdateSubsubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateSubsubcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateSubsubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
