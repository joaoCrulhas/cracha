import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserRequestDto } from '../dtos';
import { UserDto } from '../dtos/response/user-response.dto';
import { EncryptService } from '../../system/encrypt/services/encrypt.service';
import { Prisma } from 'prisma/src/lib/generated';
import { DatabaseService } from '../../system/database/services/database.service';
import { ConfigService } from '@nestjs/config';

type FindUserArgs = {
  email?: string;
  username?: string;
  hasDashboardAccess?: boolean;
};

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly encryptService: EncryptService,
    private readonly configService: ConfigService
  ) {}

  async onModuleInit() {
    const user = this.configService.getOrThrow<string>(
      'crachaAdminCredentials.username'
    );
    const password = this.configService.getOrThrow<string>(
      'crachaAdminCredentials.password'
    );

    const appId = this.configService.getOrThrow<string>(
      'crachaAdminCredentials.appId'
    );

    const uCount = await this.databaseService.client.user.count({
      where: {
        email: user,
        hasDashboardAccess: true,
      },
    });

    if (uCount) {
      return;
    }

    await this.create({
      username: user,
      email: user,
      password,
      firstName: 'admin',
      lastName: 'admin',
      hasDashboardAccess: true,
      applicationId: appId,
    });
  }

  /**
   * Creates a new user and returns the created user.
   * This user will not have access to the dashboard.
   * @param input - The user data to create.
   * @returns The created user.
   */
  async create(input: CreateUserRequestDto): Promise<UserDto> {
    const userCreated = await this.databaseService.client.user.create({
      data: {
        ...input,
        password: await this.encryptService.encrypt(input.password),
      },
    });
    return UserDto.fromPrisma(userCreated);
  }

  async find(args: FindUserArgs) {
    const { email, username, hasDashboardAccess } = args;
    const prismaArgs: Prisma.UserFindFirstOrThrowArgs = {
      where: {
        ...(hasDashboardAccess && { hasDashboardAccess }),
        ...(username && { username }),
        ...(email && { email }),
      },
    };
    return await this.databaseService.client.user.findFirstOrThrow(prismaArgs);
  }
}
