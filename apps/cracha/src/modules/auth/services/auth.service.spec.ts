import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { UserService } from '../../user/services';
import { JwtService } from '@nestjs/jwt';
import { UserTestHelper } from '../../../helpers/test';
import { DatabaseService } from '../../system/database/services/database.service';
import { prisma } from '@cracha/prisma';
import { EncryptService } from '../../system/encrypt/services/encrypt.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let userService: DeepMocked<UserService>;
  let jwtService: DeepMocked<JwtService>;
  let databaseService: DatabaseService;
  let encryptService: DeepMocked<EncryptService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DatabaseService,
        AuthService,
        {
          provide: EncryptService,
          useValue: createMock<EncryptService>(),
        },
        {
          provide: JwtService,
          useValue: createMock<JwtService>(),
        },
        {
          provide: UserService,
          useValue: createMock<UserService>(),
        },
      ],
    }).compile();

    encryptService = module.get(EncryptService);
    databaseService = module.get(DatabaseService);
    userService = module.get(UserService);
    service = module.get<AuthService>(AuthService);
    jwtService = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(encryptService).toBeDefined();
    expect(jwtService).toBeDefined();
    expect(userService).toBeDefined();
    expect(service).toBeDefined();
    expect(databaseService).toBeDefined();
  });

  it('should return an unauthorized if the password is incorrect', async () => {
    encryptService.compare.mockImplementationOnce(() => {
      return Promise.resolve(false);
    });
    const user = await UserTestHelper.createUser(prisma);
    await expect(service.signIn(user.email, user.password)).rejects.toThrow(
      UnauthorizedException
    );
  });

  it('should call the encrypt service with correct arguments', async () => {
    const user = await UserTestHelper.createUser(prisma);
    userService.find.mockResolvedValueOnce(user);
    await service.signIn(user.email, user.password);
    expect(encryptService.compare).toHaveBeenCalledWith(
      user.password,
      user.password
    );
  });

  it('should call the jwtService with correct arguments', async () => {
    const user = await UserTestHelper.createUser(prisma);
    userService.find.mockResolvedValueOnce(user);
    await service.signIn(user.email, user.password);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;
    expect(jwtService.signAsync).toHaveBeenCalledWith(rest);
  });
});
