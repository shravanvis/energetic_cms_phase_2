import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdaccessoriesComponent } from './prodaccessories.component';

describe('ProdaccessoriesComponent', () => {
  let component: ProdaccessoriesComponent;
  let fixture: ComponentFixture<ProdaccessoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdaccessoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdaccessoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
