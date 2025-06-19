import { Module } from '@nestjs/common';
import { RoleService } from './services';
import { RoleController } from './controllers/role.controller';

@Module({
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
