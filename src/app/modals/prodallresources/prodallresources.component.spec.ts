import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdallresourcesComponent } from './prodallresources.component';

describe('ProdallresourcesComponent', () => {
  let component: ProdallresourcesComponent;
  let fixture: ComponentFixture<ProdallresourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdallresourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdallresourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
