import {
  IRepositoryRead,
  IRepositoryWrite,
} from '../../../../types/repository/repository.type';
import { User } from '../entities/user.entity';
import { DatabaseService } from '../../system/database/services/database.service';
import { CreateUserRequestDto } from '../dtos';
import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma/src/lib/generated';

@Injectable()
export class UserRepository
  implements IRepositoryWrite<User>, IRepositoryRead<User>
{
  constructor(private readonly databaseService: DatabaseService) {}

  async find(args: Prisma.UserFindFirstOrThrowArgs): Promise<User> {
    return this.databaseService.client.user.findFirstOrThrow(args);
  }
  findById(id: number): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async insert(input: CreateUserRequestDto): Promise<User> {
    return this.databaseService.client.user.create({
      data: input,
    });
  }
}
