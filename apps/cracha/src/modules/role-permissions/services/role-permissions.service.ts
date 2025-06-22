import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../system/database/services';
import { Prisma, RolePermission } from '@cracha/prisma';
import { AddRolePermissionRequestDto } from '../dtos';

@Injectable()
export class RolePermissionsService {
  constructor(private readonly databaseService: DatabaseService) {}

  /**
   * Add a role to an action resource permission.
   *
   * role to.
   * @returns {Promise<Prisma.RolePermission>} - The newly created `RolePermission`
   * row.
   * @param input
   */
  async addRoleToPermission(
    input: AddRolePermissionRequestDto
  ): Promise<RolePermission> {
    const args: Prisma.RolePermissionCreateArgs = {
      data: {
        actionResource: {
          connect: {
            id: input.actionResourceId,
          },
        },
        role: {
          connect: {
            id: input.roleId,
            /* <<<<<<<<<<<<<<  ✨ Windsurf Command ⭐ >>>>>>>>>>>>>>>> */
            /**
             * Retrieves all permissions associated with a given role.
             *
             * @param {number} roleId - The ID of the role to look up.
             * @returns {Promise<Prisma.RolePermission[]>} - An array of all permissions
             * associated with the given `roleId`. Each element is a
             * `Prisma.RolePermission` containing the properties of the permission.
             */
            /* <<<<<<<<<<  1b82c2b7-6c0b-4096-a1ae-aecfdc975bd7  >>>>>>>>>>> */
          },
        },
      },
    };
    return await this.databaseService.client.rolePermission.create(args);
  }

  async getAllRolePermissions(roleId: number) {
    return await this.databaseService.client.rolePermission.findMany({
      include: {
        actionResource: {
          include: {
            action: true,
            resource: true,
          },
        },
      },
      where: {
        roleId,
      },
    });
  }
}
