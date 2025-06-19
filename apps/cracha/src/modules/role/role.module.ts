import { Module } from '@nestjs/common';
import { RoleService } from './services';
import { RoleController } from './controllers/role.controller';
import { UniqueValidator } from '../../validators/unique.validator';

@Module({
  providers: [RoleService, UniqueValidator],
  controllers: [RoleController],
})
export class RoleModule {}
