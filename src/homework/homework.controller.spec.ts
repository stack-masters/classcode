import { Test, TestingModule } from '@nestjs/testing';
import { HomeworkController } from './homework.controller';
import { HomeworkService } from './homework.service';

describe('HomeworkController', () => {
  let controller: HomeworkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeworkController],
      providers: [HomeworkService],
    }).compile();

    controller = module.get<HomeworkController>(HomeworkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
