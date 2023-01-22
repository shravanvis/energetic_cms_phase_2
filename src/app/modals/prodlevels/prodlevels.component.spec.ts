import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdlevelsComponent } from './prodlevels.component';

describe('ProdlevelsComponent', () => {
  let component: ProdlevelsComponent;
  let fixture: ComponentFixture<ProdlevelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdlevelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdlevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
