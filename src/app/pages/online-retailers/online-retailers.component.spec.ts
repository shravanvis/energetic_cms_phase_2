import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineRetailersComponent } from './online-retailers.component';

describe('OnlineRetailersComponent', () => {
  let component: OnlineRetailersComponent;
  let fixture: ComponentFixture<OnlineRetailersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineRetailersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineRetailersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
