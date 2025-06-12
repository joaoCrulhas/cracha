import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { EncryptModule } from '../system/encrypt/encrypt.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    EncryptModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
})
export class AuthModule {}
