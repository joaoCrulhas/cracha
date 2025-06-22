import { Test, TestingModule } from '@nestjs/testing';
import { RolePermissionController } from './role-permission.controller';

describe('RolePermissionController', () => {
  let controller: RolePermissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolePermissionController],
    }).compile();

    controller = module.get<RolePermissionController>(RolePermissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
