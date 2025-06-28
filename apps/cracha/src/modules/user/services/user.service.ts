import { Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from '../dtos';
import { EncryptService } from '../../system/encrypt/services';
import { Prisma } from 'prisma/src/lib/generated';
import { DatabaseService } from '../../system/database/services';
import { ConfigService } from '@nestjs/config';
import { UserDto, UserRoles } from '@cracha/shared-types';

type FindUserArgs = {
  email?: string;
  username?: string;
  hasDashboardAccess?: boolean;
};

@Injectable()
export class UserService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly encryptService: EncryptService,
    private readonly configService: ConfigService
  ) {}

  /**
   * Creates a new user and returns the created user.
   * This user will not have access to the dashboard.
   * @param input - The user data to create.
   * @returns The created user.
   */
  async create(input: CreateUserRequestDto): Promise<UserDto> {
    return await this.databaseService.client.user.create({
      data: {
        ...input,
        password: await this.encryptService.encrypt(input.password),
      },
    });
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

  async getPlatformUsers(): Promise<UserRoles[]> {
    const response = await this.databaseService.client.user.findMany({
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
      where: {
        hasDashboardAccess: false,
      },
    });
    return response.map((user) => {
      const element: UserRoles = {
        ...user,
        roles: user.userRoles.map((element) => element.role),
      };
      return element;
    });
  }
}
