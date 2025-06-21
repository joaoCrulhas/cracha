import { Test, TestingModule } from '@nestjs/testing';
import { UserRoleService } from './user-role.service';
import { DatabaseService } from '../../system/database/services';
import { UserTestHelper } from '../../../helpers/test';

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
    const user = await UserTestHelper.createUser(databaseService.getPrisma());
    const { id: roleId } = await databaseService.client.role.findFirstOrThrow();
    const received = await service.assignUserRole({
      userId: user.id,
      roleId,
    });
    expect(received.userId).toEqual(user.id);
    expect(received.roleId).toEqual(roleId);
  });

  it('should return all roles assigned for an user', async () => {
    const user = await UserTestHelper.createUser(databaseService.getPrisma());
    await UserTestHelper.userRolesAssign(databaseService.getPrisma(), user.id);
    const received = await service.getUserRoles(user.id);
    expect(received.roles.length).toBeGreaterThan(0);
    expect(received.userId).toEqual(user.id);
  });

  it('should remove a role for an user', async () => {
    const user = await UserTestHelper.createUser(databaseService.getPrisma());
    const { id: roleId } = await databaseService.client.role.findFirstOrThrow();
    await UserTestHelper.userRolesAssign(databaseService.getPrisma(), user.id);
    const received = await service.removeUserRole({
      userId: user.id,
      roleId,
    });
    expect(received.userId).toEqual(user.id);
    expect(received.roleId).toEqual(roleId);
  });
});
