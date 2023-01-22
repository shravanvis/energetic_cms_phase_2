import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductretailersComponent } from './productretailers.component';

describe('ProductretailersComponent', () => {
  let component: ProductretailersComponent;
  let fixture: ComponentFixture<ProductretailersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductretailersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductretailersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
