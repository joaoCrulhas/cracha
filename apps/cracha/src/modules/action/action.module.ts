import { Module } from '@nestjs/common';
import { ActionService } from './services/action.service';
import { ActionController } from './controllers';

@Module({
  controllers: [ActionController],
  providers: [ActionService],
})
export class ActionModule {}
