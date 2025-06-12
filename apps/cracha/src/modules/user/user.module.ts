import { Module } from '@nestjs/common';
import { UserService } from './services';
import { UserRepository } from './repository';
import { DatabaseService } from '../system/database/services/database.service';

@Module({
  providers: [
    UserService,
    {
      provide: 'USER_REPOSITORY',
      useFactory: function (db: DatabaseService) {
        return new UserRepository(db);
      },
      inject: [DatabaseService],
    },
  ],
})
export class UserModule {}
