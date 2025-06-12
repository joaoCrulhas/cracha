import { Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from '../dtos';
import { UserRepository } from '../repository';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(input: CreateUserRequestDto): Promise<User> {
    return this.userRepository.insert(input);
  }
}
