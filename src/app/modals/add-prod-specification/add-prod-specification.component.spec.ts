import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProdSpecificationComponent } from './add-prod-specification.component';

describe('AddProdSpecificationComponent', () => {
  let component: AddProdSpecificationComponent;
  let fixture: ComponentFixture<AddProdSpecificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProdSpecificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProdSpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
