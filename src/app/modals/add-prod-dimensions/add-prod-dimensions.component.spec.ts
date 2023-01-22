import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProdDimensionsComponent } from './add-prod-dimensions.component';

describe('AddProdDimensionsComponent', () => {
  let component: AddProdDimensionsComponent;
  let fixture: ComponentFixture<AddProdDimensionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProdDimensionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProdDimensionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
