import { Test, TestingModule } from '@nestjs/testing';
import { ActionResourceService } from './action-resource.service';
import { ActionTestHelper, ResourceTestHelper } from '../../../helpers/test';
import { DatabaseService } from '../../system/database/services';

describe('ActionResourceService', () => {
  let service: ActionResourceService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService, ActionResourceService],
    }).compile();

    service = module.get<ActionResourceService>(ActionResourceService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(databaseService).toBeDefined();
  });

  it('should add a resource for an action', async () => {
    const action = await ActionTestHelper.createAction(
      databaseService.getPrisma()
    );
    const resource = await ResourceTestHelper.createResource(
      databaseService.getPrisma()
    );
    const received = await service.addResourceAction({
      resourceId: resource.id,
      actionId: action.id,
    });

    expect(received.actionId).toEqual(action.id);
    expect(received.resourceId).toEqual(resource.id);
  });

  it('should remove a resource for an action', async () => {
    const action = await ActionTestHelper.createAction(
      databaseService.getPrisma()
    );
    const resource = await ResourceTestHelper.createResource(
      databaseService.getPrisma()
    );
    await service.addResourceAction({
      resourceId: resource.id,
      actionId: action.id,
    });
    const received = await service.removeActionResource(action.id, resource.id);
    expect(received.actionId).toEqual(action.id);
    expect(received.resourceId).toEqual(resource.id);
  });

  it('should return all actions associated with a resource', async () => {});
});
