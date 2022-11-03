import { TestBed } from '@angular/core/testing';

import { AssignRemoveAdvisorService } from './assign-remove-advisor.service';

describe('AssignRemoveAdvisorService', () => {
  let service: AssignRemoveAdvisorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignRemoveAdvisorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
