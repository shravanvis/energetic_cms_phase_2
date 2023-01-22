import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdallspecsComponent } from './prodallspecs.component';

describe('ProdallspecsComponent', () => {
  let component: ProdallspecsComponent;
  let fixture: ComponentFixture<ProdallspecsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdallspecsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdallspecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
