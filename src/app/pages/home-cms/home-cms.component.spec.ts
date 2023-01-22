import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCMSComponent } from './home-cms.component';

describe('HomeCMSComponent', () => {
  let component: HomeCMSComponent;
  let fixture: ComponentFixture<HomeCMSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCMSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCMSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
