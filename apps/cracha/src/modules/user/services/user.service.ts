import { Inject, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserRequestDto } from '../dtos';
import { IRepository } from '../../../../types/repository/repository.type';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: IRepository<User>
  ) {}
  async create(input: CreateUserRequestDto): Promise<User> {
    return await this.userRepository.insert(input);
  }
}
