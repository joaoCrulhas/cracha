import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserRequestDto } from '../dtos';
import { User } from '../dtos/response/user-response.dto';
import { EncryptService } from '../../system/encrypt/services/encrypt.service';
import { Prisma } from 'prisma/src/lib/generated';
import { DatabaseService } from '../../system/database/services/database.service';
import { ConfigService } from '@nestjs/config';

type FindUserArgs = { email?: string };

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
      email: user,
      password,
      firstName: 'admin',
      lastName: 'admin',
      hasDashboardAccess: true,
    });
  }

  async create(input: CreateUserRequestDto): Promise<User> {
    return await this.databaseService.client.user.create({
      data: {
        ...input,
        password: await this.encryptService.encrypt(input.password),
      },
    });
  }

  async find(args: FindUserArgs) {
    const { email } = args;
    const prismaArgs: Prisma.UserFindFirstOrThrowArgs = {
      where: {
        ...(email && { email }),
      },
    };
    return await this.databaseService.client.user.findFirstOrThrow(prismaArgs);
  }
}
