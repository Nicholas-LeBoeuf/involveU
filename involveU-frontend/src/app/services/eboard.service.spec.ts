import { TestBed } from '@angular/core/testing';

import { EboardService } from './eboard.service';

describe('EboardService', () => {
  let service: EboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
