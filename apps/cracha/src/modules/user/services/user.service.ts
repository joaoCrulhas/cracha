import { Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from '../dtos';
import { User } from '../dtos/response/user-response.dto';
import { EncryptService } from '../../system/encrypt/services/encrypt.service';
import { Prisma } from 'prisma/src/lib/generated';
import { DatabaseService } from '../../system/database/services/database.service';

type FindUserArgs = { email?: string };

@Injectable()
export class UserService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly encryptService: EncryptService
  ) {}
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
