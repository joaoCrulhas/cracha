import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
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

  @Get('/:id')
  @Admin()
  async show(@Param('id', ParseIntPipe) id: number) {
    return await this.userAdminService.getAdminUser(id);
  }
}
