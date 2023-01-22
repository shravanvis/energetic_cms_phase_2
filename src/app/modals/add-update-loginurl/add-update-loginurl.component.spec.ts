import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateLoginurlComponent } from './add-update-loginurl.component';

describe('AddUpdateLoginurlComponent', () => {
  let component: AddUpdateLoginurlComponent;
  let fixture: ComponentFixture<AddUpdateLoginurlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateLoginurlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateLoginurlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
