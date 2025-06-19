import { Module } from '@nestjs/common';
import { ActionService } from './services/action.service';

@Module({
  providers: [ActionService],
})
export class ActionModule {}
