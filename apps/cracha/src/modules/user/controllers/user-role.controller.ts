import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserRoleRequestDto } from '../dtos';
import { UserRoleService } from '../services/user-role.service';

@Controller('users/roles')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}
  @Post()
  async assignedRole(@Body() input: UserRoleRequestDto) {
    return await this.userRoleService.assignUserRole({
      userId: input.userId,
      roleId: input.roleId,
    });
  }

  @Delete()
  async removeUserRole(@Body() input: UserRoleRequestDto) {
    return await this.userRoleService.removeUserRole({
      roleId: input.roleId,
      userId: input.userId,
    });
  }

  @Get('/:userId')
  async getUserRoles(@Param('userId', ParseIntPipe) userId: number) {
    return await this.userRoleService.getUserRoles(userId);
  }
}
