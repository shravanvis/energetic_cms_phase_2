import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReorderingSubcategoryComponent } from './reordering-subcategory.component';

describe('ReorderingSubcategoryComponent', () => {
  let component: ReorderingSubcategoryComponent;
  let fixture: ComponentFixture<ReorderingSubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReorderingSubcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReorderingSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
