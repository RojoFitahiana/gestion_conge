import { TestBed } from '@angular/core/testing';

import { CompteEmployeService } from './compte-employe.service';

describe('CompteEmployeService', () => {
  let service: CompteEmployeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompteEmployeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
});
