import { Test, TestingModule } from '@nestjs/testing';
import { HomeworkService } from './homework.service';

describe('HomeworkService', () => {
  let service: HomeworkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomeworkService],
    }).compile();

    service = module.get<HomeworkService>(HomeworkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
