import { Test, TestingModule } from '@nestjs/testing';
import { UserRoleService } from './user-role.service';
import { DatabaseService } from '../../system/database/services/database.service';

describe('UserRoleService', () => {
  let service: UserRoleService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService, UserRoleService],
    }).compile();

    databaseService = module.get<DatabaseService>(DatabaseService);
    service = module.get<UserRoleService>(UserRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(databaseService).toBeDefined();
  });

  it('should assign a role for an user', async () => {
    const { id: userId } = await databaseService.client.user.findFirstOrThrow();
    const { id: roleId } = await databaseService.client.role.findFirstOrThrow();
    const received = await service.assignUserRole({
      userId,
      roleId,
    });
    expect(received.userId).toEqual(userId);
    expect(received.roleId).toEqual(roleId);
  });
});
