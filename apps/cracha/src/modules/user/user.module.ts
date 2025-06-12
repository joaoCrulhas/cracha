import { Module } from '@nestjs/common';
import { UserService } from './services';

export const UserRepositoryToken = Symbol('USER_REPOSITORY');
@Module({
  providers: [UserService],
})
export class UserModule {}
