import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../modules/user/user.module';
import { DatabaseModule } from '../modules/system/database/database.module';
import { AuthModule } from '../modules/auth/auth.module';
import { RoleModule } from '../modules/role/role.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config';
import { ActionModule } from '../modules/action/action.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    RoleModule,
    ActionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
