import { TestBed } from '@angular/core/testing';

import { FavoritingSpinnerService } from './favoriting-spinner.service';

describe('FavoritingSpinnerService', () => {
  let service: FavoritingSpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritingSpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
