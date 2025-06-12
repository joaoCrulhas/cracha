import { Module } from '@nestjs/common';
import { EncryptService } from './services/encrypt.service';

@Module({
  providers: [EncryptService],
  exports: [EncryptService],
})
export class EncryptModule {}
