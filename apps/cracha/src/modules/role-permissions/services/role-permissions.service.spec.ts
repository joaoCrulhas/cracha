import { Test, TestingModule } from '@nestjs/testing';
import { RolePermissionsService } from './role-permissions.service';
import {
  ActionTestHelper,
  ResourceTestHelper,
  RoleTestHelper,
} from '../../../helpers/test';
import { DatabaseService } from '../../system/database/services';
import { ActionResourceService } from '../../action-resource/services';

describe('RolePermissionsService', () => {
  let service: RolePermissionsService;
  let databaseService: DatabaseService;
  let actionResourceService: ActionResourceService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActionResourceService,
        RolePermissionsService,
        DatabaseService,
      ],
    }).compile();

    actionResourceService = module.get<ActionResourceService>(
      ActionResourceService
    );
    databaseService = module.get<DatabaseService>(DatabaseService);
    service = module.get<RolePermissionsService>(RolePermissionsService);
  });

  it('should be defined', () => {
    expect(actionResourceService).toBeDefined();
    expect(databaseService).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should add an action_resource for a role', async () => {
    const roleCreated = await RoleTestHelper.createRole({
      prisma: databaseService.getPrisma(),
      createdUserId: 1,
    });

    const resource = await ResourceTestHelper.createResource(
      databaseService.getPrisma()
    );

    const action = await ActionTestHelper.createAction(
      databaseService.getPrisma()
    );
    const actionResource = await actionResourceService.addResourceAction({
      actionId: action.id,
      resourceId: resource.id,
    });

    const received = await service.addRoleToPermission({
      roleId: roleCreated.id,
      actionResourceId: actionResource.id,
    });
    expect(received.roleId).toEqual(roleCreated.id);
    expect(received.actionResourceId).toEqual(actionResource.id);
  });

  it('should return all actions and resources associated for the role', async () => {
    const roleCreated = await RoleTestHelper.createRole({
      prisma: databaseService.getPrisma(),
      createdUserId: 1,
    });

    const resource = await ResourceTestHelper.createResource(
      databaseService.getPrisma()
    );

    const action = await ActionTestHelper.createAction(
      databaseService.getPrisma()
    );
    const actionResource = await actionResourceService.addResourceAction({
      actionId: action.id,
      resourceId: resource.id,
    });

    await service.addRoleToPermission({
      roleId: roleCreated.id,
      actionResourceId: actionResource.id,
    });
    const received = await service.getAllRolePermissions(roleCreated.id);
    expect(received.length).toEqual(1);
  });
});
