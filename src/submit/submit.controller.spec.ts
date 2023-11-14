import { Test, TestingModule } from '@nestjs/testing';
import { SubmitController } from './submit.controller';
import { SubmitService } from './submit.service';

describe('SubmitController', () => {
  let controller: SubmitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubmitController],
      providers: [SubmitService],
    }).compile();

    controller = module.get<SubmitController>(SubmitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
