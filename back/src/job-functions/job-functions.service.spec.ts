import { Test, TestingModule } from '@nestjs/testing';
import { JobFunctionsService } from './job-functions.service';

describe('JobFunctionsService', () => {
  let service: JobFunctionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobFunctionsService],
    }).compile();

    service = module.get<JobFunctionsService>(JobFunctionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
