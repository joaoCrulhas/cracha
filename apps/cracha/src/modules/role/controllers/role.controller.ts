import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateRoleRequestDto, UpdateRoleRequestDto } from '../dtos';
import { RoleService } from '../services';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Post()
  async create(@Body() input: CreateRoleRequestDto) {
    return await this.roleService.create(input);
  }

  @Put('/:id')
  async updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: UpdateRoleRequestDto
  ) {
    return await this.roleService.update(id, input);
  }
}
