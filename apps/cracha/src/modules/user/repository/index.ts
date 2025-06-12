import { IRepositoryWrite } from '../../../../types/repository/repository.type';
import { User } from '../entities/user.entity';

export class UserRepository implements IRepositoryWrite<User> {
  async insert(input: any): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
