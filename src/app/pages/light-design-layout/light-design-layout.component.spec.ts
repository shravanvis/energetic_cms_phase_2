import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightDesignLayoutComponent } from './light-design-layout.component';

describe('LightDesignLayoutComponent', () => {
  let component: LightDesignLayoutComponent;
  let fixture: ComponentFixture<LightDesignLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LightDesignLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LightDesignLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
