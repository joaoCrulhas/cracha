import { Test, TestingModule } from '@nestjs/testing';
import { ResourceService } from './resource.service';
import { DatabaseService } from '../../system/database/services';
import { faker } from '@faker-js/faker';

describe('ResourceService', () => {
  let service: ResourceService;
  let db: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResourceService, DatabaseService],
    }).compile();

    db = module.get<DatabaseService>(DatabaseService);
    service = module.get<ResourceService>(ResourceService);
  });

  it('should be defined', () => {
    expect(db).toBeDefined();
    expect(service).toBeDefined();
  });
  it('should return a resource', async () => {
    const name = faker.airline.airport().name;
    const resource = await service.create({ name });
    expect(resource.name).toEqual('resource');
  });
});
