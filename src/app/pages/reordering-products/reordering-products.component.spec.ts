import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReorderingProductsComponent } from './reordering-products.component';

describe('ReorderingProductsComponent', () => {
  let component: ReorderingProductsComponent;
  let fixture: ComponentFixture<ReorderingProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReorderingProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReorderingProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
