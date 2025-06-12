import { IRepositoryWrite } from '../../../../types/repository/repository.type';
import { User } from '../entities/user.entity';
import { DatabaseService } from '../../system/database/services/database.service';
import { CreateUserRequestDto } from '../dtos';

export class UserRepository implements IRepositoryWrite<User> {
  constructor(private readonly databaseService: DatabaseService) {}
  async insert(input: CreateUserRequestDto): Promise<User> {
    return this.databaseService.client.user.create({
      data: input,
    });
  }
}
