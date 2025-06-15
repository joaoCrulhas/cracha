import { Module } from '@nestjs/common';
import { RoleService } from './services';
import { RoleController } from './controllers/role.controller';
import { RoleRepository } from './repository';

@Module({
  providers: [RoleService, RoleRepository],
  controllers: [RoleController],
})
export class RoleModule {}
