import { Module } from '@nestjs/common';
import { UserService } from './services';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repository';

@Module({
  controllers: [UserController],
  providers: [UserRepository, UserService],
})
export class UserModule {}
