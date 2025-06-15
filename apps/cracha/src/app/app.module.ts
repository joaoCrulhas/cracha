import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../modules/user/user.module';
import { DatabaseModule } from '../modules/system/database/database.module';
import { AuthModule } from '../modules/auth/auth.module';
import { RoleModule } from '../modules/role/role.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, RoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
