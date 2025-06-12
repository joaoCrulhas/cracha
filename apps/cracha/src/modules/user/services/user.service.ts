import { Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from '../dtos';
import { UserRepository } from '../repository';
import { User } from '../entities/user.entity';
import { EncryptService } from '../../system/encrypt/services/encrypt.service';

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

  async find({ email }: { email: string }) {
    return await this.userRepository.find({
      where: {
        email,
      },
    });
  }
}
