import { Inject, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserRequestDto } from '../dtos';
import { IRepository } from '../../../../types/repository/repository.type';
import { UserRepositoryToken } from '../user.module';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IRepository<User>
  ) {}
  async create(input: CreateUserRequestDto): Promise<User> {
    return await this.userRepository.insert(input);
  }
}
