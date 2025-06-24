import { Module } from '@nestjs/common';
import { UserAdminService, UserRoleService, UserService } from './services';
import {
  UserAdminController,
  UserController,
  UserRoleController,
} from './controllers';
import { EncryptModule } from '../system/encrypt/encrypt.module';

@Module({
  imports: [EncryptModule],
  controllers: [UserController, UserRoleController, UserAdminController],
  providers: [UserAdminService, UserService, UserRoleService],
  exports: [UserService],
})
export class UserModule {}
