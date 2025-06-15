import { Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from '../dtos';
import { UserRepository } from '../repository';
import { User } from '../entities/user.entity';
import { EncryptService } from '../../system/encrypt/services/encrypt.service';
import { Prisma } from 'prisma/src/lib/generated';

type FindUserArgs = { email?: string };

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encryptService: EncryptService
  ) {}
  async create(input: CreateUserRequestDto): Promise<User> {
    return this.userRepository.insert({
      ...input,
      password: await this.encryptService.encrypt(input.password),
    });
  }

  async find(args: FindUserArgs) {
    const { email } = args;
    const prismaArgs: Prisma.UserFindFirstOrThrowArgs = {
      where: {
        ...(email && { email }),
      },
    };
    return await this.userRepository.find(prismaArgs);
  }
}
