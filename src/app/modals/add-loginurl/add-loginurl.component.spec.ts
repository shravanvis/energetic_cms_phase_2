import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoginurlComponent } from './add-loginurl.component';

describe('AddLoginurlComponent', () => {
  let component: AddLoginurlComponent;
  let fixture: ComponentFixture<AddLoginurlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLoginurlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLoginurlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
