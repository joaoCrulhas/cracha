import { Module } from '@nestjs/common';
import { UserService } from './services';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repository';
import { EncryptModule } from '../system/encrypt/encrypt.module';

@Module({
  imports: [EncryptModule],
  controllers: [UserController],
  providers: [UserRepository, UserService],
  exports: [UserService],
})
export class UserModule {}
