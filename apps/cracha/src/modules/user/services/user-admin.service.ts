import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../system/database/services';
import { CreateUserRequestDto } from '../dtos';
import { UserDto } from '../dtos/response/user-response.dto';
import { EncryptService } from '../../system/encrypt/services/encrypt.service';

@Injectable()
export class UserAdminService {
  private hasDashboardAccess = true;
  constructor(
    private readonly encryptService: EncryptService,
    private readonly databaseService: DatabaseService
  ) {}

  async createUserAdmin(input: CreateUserRequestDto): Promise<UserDto> {
    const password = await this.encryptService.encrypt(input.password);
    const userCreated = await this.databaseService.client.user.create({
      data: {
        ...input,
        password,
        hasDashboardAccess: this.hasDashboardAccess,
      },
    });
    return UserDto.fromPrisma(userCreated);
  }
}
