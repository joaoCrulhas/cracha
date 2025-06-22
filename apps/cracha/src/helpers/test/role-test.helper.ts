import { Prisma, PrismaClient } from '@cracha/prisma';
import { faker } from '@faker-js/faker';

type CreateRoleArgs = {
  prisma: PrismaClient;
  createdUserId: number;
  input?: Prisma.RoleCreateInput;
};
export class RoleTestHelper {
  static async createRole({ prisma, createdUserId, input }: CreateRoleArgs) {
    return prisma.role.create({
      data: {
        createdUserId: createdUserId,
        name: input?.name ?? faker.lorem.word(),
        description: input?.name ?? faker.lorem.word(),
      },
    });
  }
}
