import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCatalogsComponent } from './add-catalogs.component';

describe('AddCatalogsComponent', () => {
  let component: AddCatalogsComponent;
  let fixture: ComponentFixture<AddCatalogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCatalogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCatalogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
