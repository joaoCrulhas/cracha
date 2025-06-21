import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../system/database/services/database.service';
import { UserRolesResponseDto } from '../dtos/response/user-roles-response.dto';
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
}
