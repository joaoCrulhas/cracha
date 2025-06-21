import { Test, TestingModule } from '@nestjs/testing';
import { ActionService } from './action.service';
import { DatabaseService } from '../../system/database/services/database.service';
import { ActionTestHelper } from '../../../helpers/test';
import { prisma } from '@cracha/prisma';
import { faker } from '@faker-js/faker';

describe('ActionService', () => {
  let service: ActionService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActionService, DatabaseService],
    }).compile();
    databaseService = module.get<DatabaseService>(DatabaseService);
    service = module.get<ActionService>(ActionService);
  });

  it('should be defined', () => {
    expect(databaseService).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('createAction', () => {
    it('should create an action', async () => {
      const actionName = faker.food.dish();
      const received = await service.createAction({
        name: actionName,
      });
      expect(received.name).toEqual(actionName);
    });
  });
  describe('deleteAction', () => {
    it('should delete an action', async () => {
      const { id } = await databaseService.client.action.findFirstOrThrow();
      const received = await service.deleteAction(id);
      expect(received.id).toEqual(id);
    });
  });
  describe('updateAction', () => {
    it('should update an action', async () => {
      const actionCreated = await ActionTestHelper.createAction(prisma);
      const { id } = await databaseService.client.action.findFirstOrThrow({
        where: {
          id: actionCreated.id,
        },
      });
      const received = await service.updateAction(id, {
        name: 'mocked_name',
      });
      expect(received.name).toEqual('mocked_name');
    });
  });
});
