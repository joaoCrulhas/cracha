import { Module } from '@nestjs/common';
import { ActionResourceService } from './services';

@Module({
  providers: [ActionResourceService],
})
export class ActionResourceModule {}
