import { Module } from '@nestjs/common';
import { RolePermissionsService } from './services';
import { RolePermissionController } from './controllers';

@Module({
  controllers: [RolePermissionController],
  providers: [RolePermissionsService],
})
export class RolePermissionsModule {}
