import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingsProductsComponent } from './listings-products.component';

describe('ListingsProductsComponent', () => {
  let component: ListingsProductsComponent;
  let fixture: ComponentFixture<ListingsProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingsProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingsProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
