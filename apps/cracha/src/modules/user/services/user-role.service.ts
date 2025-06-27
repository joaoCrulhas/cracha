import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../system/database/services';
import { UserRolesResponseDto } from '../dtos';
import { Role } from '../../role/dtos';

type UserRoleArgs = { userId: number; roleId: number };

@Injectable()
export class UserRoleService {
  constructor(private readonly databaseService: DatabaseService) {}
  async assignUserRole({ userId, roleId }: UserRoleArgs) {
    return await this.databaseService.client.userRoles.create({
      data: {
        roleId,
        userId,
      },
    });
  }

  async removeUserRole({ roleId, userId }: UserRoleArgs) {
    return await this.databaseService.client.userRoles.delete({
      where: {
        roleId_userId: {
          roleId,
          userId,
        },
      },
    });
  }

  async getUserRoles(userId: number): Promise<UserRolesResponseDto> {
    const userRoles = await this.databaseService.client.userRoles.findMany({
      include: {
        role: true,
      },
      where: {
        userId,
      },
    });
    const roles: Role[] = userRoles.map((element) => element.role);

    return {
      userId,
      roles,
    };
  }

  async userHasRole(userId: number, roleId: number): Promise<boolean> {
    const userRole = await this.databaseService.client.userRoles.count({
      where: {
        userId,
        roleId,
      },
    });
    return userRole > 0;
  }

  async checkUserResourceAction(input: {
    userId: number;
    resourceId: number;
    actionId: number;
  }): Promise<boolean> {
    const response = await this.databaseService.client.userRoles.findFirst({
      include: {
        role: {
          include: {
            RolePermission: {
              include: {
                actionResource: {
                  include: {
                    action: true,
                    resource: true,
                  },
                },
              },
            },
          },
        },
      },
      where: {
        user: {
          id: input.userId,
        },
      },
    });
    return !!response;
  }
}
