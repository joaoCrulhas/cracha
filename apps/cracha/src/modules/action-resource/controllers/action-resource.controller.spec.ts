import { Test, TestingModule } from '@nestjs/testing';
import { ActionResourceController } from './action-resource.controller';

describe('ActionResourceController', () => {
  let controller: ActionResourceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActionResourceController],
    }).compile();

    controller = module.get<ActionResourceController>(ActionResourceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
