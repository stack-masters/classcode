import { Test, TestingModule } from '@nestjs/testing';
import { SubmitService } from './submit.service';

describe('SubmitService', () => {
  let service: SubmitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubmitService],
    }).compile();

    service = module.get<SubmitService>(SubmitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
