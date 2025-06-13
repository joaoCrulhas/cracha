import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreateUserRequestDto } from '../dtos';
import { UserService } from '../services';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async createUser(@Body() input: CreateUserRequestDto) {
    return await this.userService.create(input);
  }

  @Post()
  async createAdmin(@Body() input: CreateUserRequestDto) {
    return await this.userService.create({
      ...input,
      hasDashboardAccess: true,
    });
  }

  @Get('me')
  public me(@Req() request: Request & { user: any }) {
    return request.user;
  }
}
