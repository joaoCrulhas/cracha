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
    return await this.databaseService.client.rolePermission.create({
      include: {
        role: true,
        actionResource: {
          include: {
            action: true,
            resource: true,
          },
        },
      },
      data: {
        actionResource: {
          connect: {
            id: input.actionResourceId,
          },
        },
        role: {
          connect: {
            id: input.roleId,
          },
        },
      },
    });
  }

  async getAllRolePermissions(roleId: number) {
    const rolePermissions =
      await this.databaseService.client.rolePermission.findMany({
        include: {
          role: true,
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
    return rolePermissions.map((element) => {
      const { action, resource } = element.actionResource;
      return { action, resource };
    });
  }
}
