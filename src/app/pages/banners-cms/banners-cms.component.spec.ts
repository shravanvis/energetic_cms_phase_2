import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannersCmsComponent } from './banners-cms.component';

describe('BannersCmsComponent', () => {
  let component: BannersCmsComponent;
  let fixture: ComponentFixture<BannersCmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannersCmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannersCmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
