import { Module } from '@nestjs/common';
import { ResourceService } from './services';

@Module({
  providers: [ResourceService],
})
export class ResourceModule {}
