import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProdResourcesComponent } from './add-prod-resources.component';

describe('AddProdResourcesComponent', () => {
  let component: AddProdResourcesComponent;
  let fixture: ComponentFixture<AddProdResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProdResourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProdResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
