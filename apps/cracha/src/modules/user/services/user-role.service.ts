import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../system/database/services/database.service';

type UserRoleArgs = { userId: number; roleId: number };

@Injectable()
export class UserRoleService {
  constructor(private readonly databaseService: DatabaseService) {}
  async assignUserRole({ userId, roleId }: UserRoleArgs) {
    await this.databaseService.client.userRoles.create({
      data: {
        roleId,
        userId,
      },
    });
  }

  async removeUserRole({ roleId, userId }: UserRoleArgs) {
    await this.databaseService.client.userRoles.delete({
      where: {
        roleId_userId: {
          roleId,
          userId,
        },
      },
    });
  }

  async getUserRoles(userId: number) {
    return await this.databaseService.client.userRoles.findMany({
      include: {
        role: true,
        user: true,
      },
      where: {
        userId,
      },
    });
  }
}
