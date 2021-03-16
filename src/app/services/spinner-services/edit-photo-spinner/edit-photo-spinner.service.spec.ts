import { TestBed } from '@angular/core/testing';

import { EditPhotoSpinnerService } from './edit-photo-spinner.service';

describe('EditPhotoSpinnerService', () => {
  let service: EditPhotoSpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditPhotoSpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
