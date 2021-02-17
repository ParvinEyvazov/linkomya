import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VectorImagesComponent } from './vector-images.component';

describe('VectorImagesComponent', () => {
  let component: VectorImagesComponent;
  let fixture: ComponentFixture<VectorImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VectorImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VectorImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
