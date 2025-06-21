import { Module } from '@nestjs/common';
import { UserRoleService, UserService } from './services';
import { UserController, UserRoleController } from './controllers';
import { EncryptModule } from '../system/encrypt/encrypt.module';

@Module({
  imports: [EncryptModule],
  controllers: [UserController, UserRoleController],
  providers: [UserService, UserRoleService],
  exports: [UserService],
})
export class UserModule {}
