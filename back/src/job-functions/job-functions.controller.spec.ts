import { Test, TestingModule } from '@nestjs/testing';
import { JobFunctionsController } from './job-functions.controller';
import { JobFunctionsService } from './job-functions.service';

describe('JobFunctionsController', () => {
  let controller: JobFunctionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobFunctionsController],
      providers: [JobFunctionsService],
    }).compile();

    controller = module.get<JobFunctionsController>(JobFunctionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
