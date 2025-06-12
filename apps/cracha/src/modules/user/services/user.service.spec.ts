import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserTestHelper } from '../../../../helpers/test/user-test.helper';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { faker } from '@faker-js/faker';
import { UserRepository } from '../repository';

describe('UserService', () => {
  let service: UserService;
  let userRepository: DeepMocked<UserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: createMock<UserRepository>(),
        },
      ],
    }).compile();

    userRepository = module.get(UserRepository);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should call the repository with correct arguments', async () => {
    const input = UserTestHelper.createUserInput();
    const id = faker.number.int();
    const mockedResponse = {
      ...input,
      id,
    };
    userRepository.insert.mockResolvedValueOnce(mockedResponse);
    const received = await service.create(input);
    expect(received.id).toBeGreaterThan(0);
    expect(userRepository.insert).toHaveBeenCalled();
  });
});
