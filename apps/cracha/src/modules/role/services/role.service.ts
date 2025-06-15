import { Injectable } from '@nestjs/common';
import { CreateRoleRequestDto, Role, UpdateRoleRequestDto } from '../dtos';
import { RoleRepository } from '../repository';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}
  async create(input: CreateRoleRequestDto): Promise<Role> {
    return await this.roleRepository.insert(input);
  }

  async update(id: number, input: UpdateRoleRequestDto): Promise<Role> {
    return await this.roleRepository.update(id, input);
  }

  async delete(id: number): Promise<Role> {
    return await this.roleRepository.delete(id);
  }
}
