import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateRoleRequestDto, UpdateRoleRequestDto } from '../dtos';
import { RoleService } from '../services';
import { User as UserDecorator } from '../../../../helpers/decorators/user.decorator';
import { User } from '../../user/dtos/response/user-response.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Post()
  async create(
    @UserDecorator() user: User,
    @Body() input: CreateRoleRequestDto
  ) {
    return await this.roleService.create({
      ...input,
      createdUserId: user.id,
    });
  }

  @Put('/:id')
  async updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: UpdateRoleRequestDto
  ) {
    return await this.roleService.update(id, input);
  }

  @Delete('/:id')
  async deleteRole(@Param('id', ParseIntPipe) id: number) {
    return await this.roleService.delete(id);
  }

  @Get()
  async getAllRoles() {
    await this.roleService.getAll();
  }

  @Get('/:roleId')
  async getRoleById(@Param('roleId', ParseIntPipe) roleId: number) {
    return await this.roleService.getById(roleId);
  }
}
