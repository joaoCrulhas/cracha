import { Module } from '@nestjs/common';
import { ResourceService } from './services';
import { ResourceController } from './controllers';

@Module({
  controllers: [ResourceController],
  providers: [ResourceService],
})
export class ResourceModule {}
