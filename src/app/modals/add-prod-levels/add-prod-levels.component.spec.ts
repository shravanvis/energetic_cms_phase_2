import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProdLevelsComponent } from './add-prod-levels.component';

describe('AddProdLevelsComponent', () => {
  let component: AddProdLevelsComponent;
  let fixture: ComponentFixture<AddProdLevelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProdLevelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProdLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
