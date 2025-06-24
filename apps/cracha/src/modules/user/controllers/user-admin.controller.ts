import { Body, Controller, Post } from '@nestjs/common';
import { Admin } from '../../auth/guards';
import { UserAdminService } from '../services';
import { CreateUserRequestDto } from '../dtos';

@Controller('users/admin')
export class UserAdminController {
  constructor(private readonly userAdminService: UserAdminService) {}
  @Post()
  @Admin()
  async create(@Body() input: CreateUserRequestDto) {
    return await this.userAdminService.createUserAdmin(input);
  }
}
