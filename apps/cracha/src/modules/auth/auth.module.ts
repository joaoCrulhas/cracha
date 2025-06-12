import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { EncryptModule } from '../system/encrypt/encrypt.module';

@Module({
  providers: [AuthService, EncryptModule],
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
})
export class AuthModule {}
