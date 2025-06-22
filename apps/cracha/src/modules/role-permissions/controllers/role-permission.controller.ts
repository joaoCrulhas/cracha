import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { RolePermissionsService } from '../services/role-permissions.service';
import { AddRolePermissionRequestDto } from '../dtos';

@Controller('role-permission')
export class RolePermissionController {
  constructor(private readonly rolePermissionService: RolePermissionsService) {}

  @Post()
  async addRoleToPermission(@Body() input: AddRolePermissionRequestDto) {
    return await this.rolePermissionService.addRoleToPermission(input);
  }

  @Get('/:roleId')
  async getAllRolePermissions(@Param('roleId', ParseIntPipe) roleId: number) {
    return await this.rolePermissionService.getAllRolePermissions(roleId);
  }
}
