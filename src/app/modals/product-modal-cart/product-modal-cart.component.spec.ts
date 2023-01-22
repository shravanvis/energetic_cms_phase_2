import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductModalCartComponent } from './product-modal-cart.component';

describe('ProductModalCartComponent', () => {
  let component: ProductModalCartComponent;
  let fixture: ComponentFixture<ProductModalCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductModalCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductModalCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
