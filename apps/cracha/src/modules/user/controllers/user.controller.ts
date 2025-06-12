import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserRequestDto } from '../dtos';
import { UserService } from '../services';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async createUser(@Body() input: CreateUserRequestDto) {
    return await this.userService.create(input);
  }
}
