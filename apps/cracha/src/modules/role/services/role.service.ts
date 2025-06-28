import { Injectable } from '@nestjs/common';
import { CreateRoleRequestDto, Role, UpdateRoleRequestDto } from '../dtos';
import { DatabaseService } from '../../system/database/services';

@Injectable()
export class RoleService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(input: CreateRoleRequestDto): Promise<Role> {
    return await this.databaseService.client.role.create({
      data: input,
    });
  }

  async update(id: number, input: UpdateRoleRequestDto): Promise<Role> {
    return await this.databaseService.client.role.update({
      data: input,
      where: {
        id,
      },
    });
  }

  async delete(id: number): Promise<Role> {
    return await this.databaseService.client.role.delete({
      id,
    });
  }

  async getAll() {
    return await this.databaseService.client.role.findMany();
  }

  async getById(roleId: number) {
    return await this.databaseService.client.role.findFirstOrThrow({
      where: {
        id: roleId,
      },
    });
  }
}
