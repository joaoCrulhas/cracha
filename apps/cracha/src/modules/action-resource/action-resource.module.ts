import { Module } from '@nestjs/common';
import { ActionResourceService } from './services';
import { ActionResourceController } from './controllers';

@Module({
  controllers: [ActionResourceController],
  providers: [ActionResourceService],
})
export class ActionResourceModule {}
