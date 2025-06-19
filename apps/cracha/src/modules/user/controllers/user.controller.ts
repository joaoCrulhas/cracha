import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreateUserRequestDto } from '../dtos';
import { UserService } from '../services';
import { Request } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async createUser(@Body() input: CreateUserRequestDto) {
    const { password, ...user } = await this.userService.create(input);
    return user;
  }

  @Get('me')
  public me(@Req() request: Request & { user: any }) {
    return request.user;
  }
}
