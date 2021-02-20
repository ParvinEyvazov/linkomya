import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundPhotoComponent } from './background-photo.component';

describe('BackgroundPhotoComponent', () => {
  let component: BackgroundPhotoComponent;
  let fixture: ComponentFixture<BackgroundPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackgroundPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
