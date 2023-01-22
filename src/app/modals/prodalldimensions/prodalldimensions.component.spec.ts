import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdalldimensionsComponent } from './prodalldimensions.component';

describe('ProdalldimensionsComponent', () => {
  let component: ProdalldimensionsComponent;
  let fixture: ComponentFixture<ProdalldimensionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdalldimensionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdalldimensionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
