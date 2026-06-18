import { TestBed } from '@angular/core/testing';

import { JobFunctionService } from './job-function.service';

describe('JobFunctionService', () => {
  let service: JobFunctionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobFunctionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
