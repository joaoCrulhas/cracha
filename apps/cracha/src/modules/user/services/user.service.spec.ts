import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { DatabaseService } from '../../system/database/services/database.service';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { EncryptService } from '../../system/encrypt/services/encrypt.service';
import { CreateUserRequestDto } from '../dtos';
import { faker } from '@faker-js/faker';
import { ConfigService } from '@nestjs/config';
import { mockedConfigService } from '../../../helpers/test';

describe('UserService', () => {
  let service: UserService;
  let encryptServiceMock: DeepMocked<EncryptService>;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        DatabaseService,
        {
          provide: ConfigService,
          useValue: createMock<ConfigService>(mockedConfigService),
        },
        {
          provide: EncryptService,
          useValue: createMock<EncryptService>(),
        },
      ],
    }).compile();
    encryptServiceMock = module.get(EncryptService);
    databaseService = module.get<DatabaseService>(DatabaseService);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(encryptServiceMock).toBeDefined();
    expect(databaseService).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should create an user', async () => {
    encryptServiceMock.encrypt.mockResolvedValueOnce('mocked_password');
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({
      firstName,
      lastName,
    });
    const password: string = faker.internet.password();
    const userInput: CreateUserRequestDto = {
      password,
      firstName,
      lastName,
      email,
      hasDashboardAccess: true,
      username: `${firstName}.${lastName}`,
      applicationId: faker.string.uuid(),
    };

    const expected = {
      applicationId: userInput.applicationId,
      createdAt: expect.any(Date),
      deletedAt: null,
      email,
      firstName,
      hasDashboardAccess: true,
      id: expect.any(Number),
      username: userInput.username,
      lastName,
      password: 'mocked_password',
      updatedAt: expect.any(Date),
    };
    const received = await service.create(userInput);
    expect(received).toEqual(expected);
  });

  it('should return an user if the email exists', async () => {
    const { email } = await databaseService.client.user.findFirstOrThrow({
      select: {
        email: true,
      },
    });
    const user = await service.find({
      email,
    });
    expect(user).toBeDefined();
    expect(user.email).toEqual(email);
  });

  it('should thrown an error if the user was not found', async () => {
    await expect(async () => {
      await service.find({
        email: 'error@gmail.com',
      });
    }).rejects.toThrow();
  });
});
