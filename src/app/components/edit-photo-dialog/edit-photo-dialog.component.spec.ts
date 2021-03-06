import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPhotoDialogComponent } from './edit-photo-dialog.component';

describe('EditPhotoDialogComponent', () => {
  let component: EditPhotoDialogComponent;
  let fixture: ComponentFixture<EditPhotoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPhotoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPhotoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
