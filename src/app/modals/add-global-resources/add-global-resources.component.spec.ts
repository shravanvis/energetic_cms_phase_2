import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGlobalResourcesComponent } from './add-global-resources.component';

describe('AddGlobalResourcesComponent', () => {
  let component: AddGlobalResourcesComponent;
  let fixture: ComponentFixture<AddGlobalResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGlobalResourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGlobalResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
