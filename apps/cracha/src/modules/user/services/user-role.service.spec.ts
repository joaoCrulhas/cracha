import { Test, TestingModule } from '@nestjs/testing';
import { UserRoleService } from './user-role.service';
import { DatabaseService } from '../../system/database/services';
import { RoleTestHelper, UserTestHelper } from '../../../helpers/test';
import { faker } from '@faker-js/faker';

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

  it('should return true if the user has the role', async () => {
    const user = await UserTestHelper.createUser(databaseService.getPrisma());
    const role = await RoleTestHelper.createRole({
      prisma: databaseService.getPrisma(),
      createdUserId: 1,
      input: {
        createrUser: {
          connect: {
            id: 1,
          },
        },
        name: faker.food.ingredient(),
        description: faker.lorem.sentence(),
      },
    });
    await service.assignUserRole({
      userId: user.id,
      roleId: role.id,
    });
    const received = await service.userHasRole(user.id, role.id);
    expect(received).toBeTruthy();
  });

  it('should return false if the user does not have the role', async () => {
    const user = await UserTestHelper.createUser(databaseService.getPrisma());
    const role = await RoleTestHelper.createRole({
      prisma: databaseService.getPrisma(),
      createdUserId: 1,
      input: {
        createrUser: {
          connect: {
            id: 1,
          },
        },
        name: faker.food.ingredient(),
        description: faker.lorem.sentence(),
      },
    });
    const received = await service.userHasRole(user.id, role.id);
    expect(received).toBeFalsy();
  });

  it('should return false if the user cannot perform an action over a resource', async () => {
    const user = await UserTestHelper.createUser(databaseService.getPrisma());
    const prisma = databaseService.getPrisma();

    const resource = await prisma.resource.findFirstOrThrow({
      select: {
        id: true,
      },
    });
    const action = await prisma.action.findFirstOrThrow({
      select: {
        id: true,
      },
    });

    const received = await service.checkUserResourceAction({
      userId: user.id,
      resourceId: resource.id,
      actionId: action.id,
    });
    expect(received).toBeFalsy();
  });

  it('should return true if the user can perform an action over a resource', async () => {
    const prisma = databaseService.getPrisma();
    const roleUser = await prisma.role.findFirstOrThrow({
      include: {
        userRoles: true,
      },
      where: {
        name: 'admin',
      },
    });
    // Get the userId who has an admin role
    const userId = roleUser.userRoles.map((element) => element.userId)[0];
    const received = await service.checkUserResourceAction({
      userId: userId,
      actionId: 1,
      resourceId: 1,
    });
    expect(received).toBeTruthy();
  });
});
