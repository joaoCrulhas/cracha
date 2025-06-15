import { Injectable } from '@nestjs/common';
import {
  IRepositoryRead,
  IRepositoryWrite,
} from '../../../../types/repository/repository.type';
import { DatabaseService } from '../../system/database/services/database.service';
import { CreateRoleRequestDto, Role, UpdateRoleRequestDto } from '../dtos';

@Injectable()
export class RoleRepository
  implements IRepositoryWrite<Role>, IRepositoryRead<Role>
{
  constructor(private readonly databaseService: DatabaseService) {}

  update(id: number, input: UpdateRoleRequestDto): Promise<Role> {
    return this.databaseService.client.role.update({
      data: input,
      where: {
        id,
      },
    });
  }

  find(where: any): Promise<Role> {
    throw new Error('Method not implemented.');
  }
  findById(id: number): Promise<Role> {
    throw new Error('Method not implemented.');
  }
  async insert(input: CreateRoleRequestDto): Promise<Role> {
    return this.databaseService.client.role.create({
      data: input,
    });
  }
}
