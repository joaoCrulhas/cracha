import { Test, TestingModule } from '@nestjs/testing';
import { UserAdminService } from './user-admin.service';
import { DeepMocked } from '@golevelup/ts-jest';
import { EncryptService } from '../../system/encrypt/services';
import { DatabaseService } from '../../system/database/services';
import { CreateUserRequestDto } from '../dtos';
import { faker } from '@faker-js/faker';
import { UserTestHelper } from '../../../helpers/test';

describe('UserAdminService', () => {
  let service: UserAdminService;
  let encryptServiceMock: DeepMocked<EncryptService>;
  let db: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAdminService, EncryptService, DatabaseService],
    }).compile();

    service = module.get<UserAdminService>(UserAdminService);
    encryptServiceMock = module.get(EncryptService);
    db = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(db).toBeDefined();
    expect(encryptServiceMock).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should create an admin user', async () => {
    const fName = faker.person.firstName();
    const lName = faker.person.lastName();
    const email = faker.internet.email({
      firstName: fName,
      lastName: lName,
    });
    const username = `${fName}_${lName}`;
    const input: CreateUserRequestDto = {
      applicationId: faker.string.uuid(),
      username,
      password: faker.internet.password(),
      firstName: fName,
      lastName: lName,
      email,
      hasDashboardAccess: true,
    };
    const received = await service.createUserAdmin(input);
    expect(received.hasDashboardAccess).toBeTruthy();
    expect(received.email).toEqual(email);
    expect(received.username).toEqual(username);
    expect(received.firstName).toEqual(fName);
    expect(received.lastName).toEqual(lName);
    expect(received.id).toBeGreaterThan(0);
  });

  it('should return an admin user based on id', async () => {
    const input = UserTestHelper.createUserInput({
      hasDashboardAccess: true,
    });
    const user = await UserTestHelper.createUser(db.getPrisma(), input);
    const received = await service.getAdminUser(user.id);
    expect(received.hasDashboardAccess).toBeTruthy();
  });
});
