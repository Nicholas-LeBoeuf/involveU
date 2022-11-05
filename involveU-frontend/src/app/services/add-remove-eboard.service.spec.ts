import { TestBed } from '@angular/core/testing';

import { AddRemoveEboardService } from './add-remove-eboard.service';

describe('AddRemoveEboardService', () => {
  let service: AddRemoveEboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddRemoveEboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
